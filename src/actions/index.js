import { redirect } from "react-router-dom";
import customFetch from "../axios/custom";

// Action for handling search
export const searchAction = async ({ request }) => {
  // Getting form data
  const formData = await request.formData();
  // Converting form data to object for easy access
  const data = Object.fromEntries(formData);

  return redirect(`/search?query=${data?.searchInput || ""}`);
};

// Action for handling checkout
export const checkoutAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    // Sending data to the server
    const response = await customFetch.post("/orders", data);
    // Optionally check for response status and handle accordingly
    if (response.status === 201) {
      // Handle successful order creation if needed
    } else {
      // Handle errors if response is not as expected
      console.error("Order creation failed:", response.data);
      // Optionally, redirect or show a message
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    // Handle the error, e.g., show a notification to the user
    // You might want to redirect to an error page or show a toast
  }

  return redirect("/");
};
