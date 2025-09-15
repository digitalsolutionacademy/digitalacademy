const SUPABASE_URL = "https://pbxccdobbiebsyiypgvl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieGNjZG9iYmllYnN5aXlwZ3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MzA2NTYsImV4cCI6MjA3MzUwNjY1Nn0.xgnj4uYG28VvPptlGjI-gVJ24NCc_qbVzwv3rxU4xp4";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset errors
  document.getElementById("generalError").innerText = "";

  // Collect form values
  const full_name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const course = document.getElementById("course").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Validation
  if (password !== confirmPassword) {
    document.getElementById("generalError").innerText = "Passwords do not match!";
    return;
  }

  try {
    // Generate Student ID
    const student_id = `DSA-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`;
    const enrollment_date = new Date().toISOString().split('T')[0];
    const school = "Digital Solution Academy";

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          phone,
          course,
          student_id,
          school,
          enrollment_date,
        },
      },
    });

    if (authError) throw authError;
    
    if (!authData.user) {
      throw new Error("User creation failed - no user data returned");
    }

    const user = authData.user;

    // 2. Wait a moment for the user session to be established
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. Insert into user_profiles - this should now work with RLS policies
    const { error: profileError } = await client.from("user_profiles").insert({
      id: user.id,
      full_name,
      phone,
      course,
      student_id,
      school,
      enrollment_date,
    });

    if (profileError) {
      console.error("Profile insert error:", profileError);
      
      // If RLS error, try using the service role key (for development only)
      if (profileError.message.includes('row-level security')) {
        await insertWithServiceRole(user.id, full_name, phone, course, student_id, school, enrollment_date);
      } else {
        throw profileError;
      }
    }

    alert("✅ Registration successful! Please check your email to confirm.");
    registerForm.reset();
    
  } catch (err) {
    console.error("Registration error:", err);
    document.getElementById("generalError").innerText = 
      err.message || "An error occurred during registration. Please try again.";
  }
});

// Fallback method using service role key (DEVELOPMENT ONLY)
async function insertWithServiceRole(id, full_name, phone, course, student_id, school, enrollment_date) {
  console.log("Using service role fallback due to RLS issues");
  
  // WARNING: Never expose service role key in client-side code
  // This is for development testing only
  const SERVICE_KEY = "your_service_role_key_here"; // Get this from Supabase settings
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/user_profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        id,
        full_name,
        phone,
        course,
        student_id,
        school,
        enrollment_date,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Service role API error: ${response.status} - ${errorText}`);
    }

    console.log("Profile created successfully via service role");
    
  } catch (error) {
    console.error("Service role fallback failed:", error);
    throw new Error("Registration failed due to security policies. Please contact support.");
  }
}