"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuCircleDashed } from "react-icons/lu";
import { z } from "zod";
import axios from "axios";
import { toast } from 'sonner';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FROM SCHEMA FOR VALIDATION
const FormSchema = z.object({
  newsletter: z.string().min(12, { message: "Email must be at least 12 characters." }).email({ message: 'Must be a valid email' }),
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Footer() {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newsletter: "",
    },
  })

  

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // POST SUBSCRIBER EMAIL WHEN SUBMIT THE FORM
  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    setLoading(true); // Set loading state to true when form submission starts

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.newsletter);

      const response = await axios.post('/api/newsletter', formDataToSend);
      const responseData = response.data;

      if (responseData.success) {
        toast.success("Hurray🎉 You Subscribed Event Hub");
      } else {
        toast("Submission Failed");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast("Submission Failed");
      } else {
        toast("An unexpected error occurred");
      }
      console.error('Error saving FAQ:', error);
    } finally {
      setLoading(false);
    }
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // MAKE LOADING STATE OF BUTTON WHEN API IS WORKING
  const [loading, setLoading] = useState(false);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <footer className="bg-white dark:bg-neutral-900 text-black mt-0 p-0 lg:p-10">
      <div className="container mx-auto lg:px-4">
        <div className="bg-gray-100 dark:bg-neutral-800 text-black rounded-xl p-9 mb-10 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <Link href="/" className="flex items-center gap-2 " prefetch={false}>
              <Image
                src="/images/electricIcon.svg"
                alt="Jobboost Logo"
                width={200}
                height={35}
                className={"w-8 sm:w-3 md:w-10"}
              />
              <span className="text-2xl font-bold text-black dark:text-white">Assignment</span>
            </Link>

            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 flex flex-col items-end">
                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem>
                        <h3 className="text-2xl font-bold text-black dark:text-white">Newsletter</h3>
                        <FormDescription className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 w-full">
                          Subscribe to our newsletter to get latest updates about events
                        </FormDescription>
                        <div className="gap-4 items-center mt-3">
                          <div className="px-3 text-sm relative">
                            <FormMessage className="bg-white px-10 py-2 rounded-lg absolute bottom-2 shadow-xl" />
                          </div>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="What is your work email"
                              className="text-base px-6 pt-5 pb-6 mt-2 rounded-full outline-none border-2 border-gray-500 shadow-none min-w-full lg:min-w-96 font-medium tracking-wider"
                              {...field} />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-[#FC4C02] text-white rounded-full py-2 mt-2 w-fit h-10 disabled:opacity-90"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="flex items-end gap-2 px-5">
                          <LuCircleDashed className="h-4 w-4 animate-spin font-bold mb-0.5" /> Please wait...
                        </div>
                      </>
                    ) : (
                      <span className="px-14">Subscribe</span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-600 px-5 lg:px-0 py-10">
          <p className="mt-2 font-medium text-sm text-gray-500"> © 2025 <Link href={"/"}>assignment</Link> .{" "} <Link href={"/"}>assignment</Link> and the{" "} <Link href={"/"}>assignment</Link> logo are registered trademarks of the company. All services are currently available only within India. For any inquiries or support, please contact us through our{" "} <Link href={"https://portfolio-amit7976s-projects.vercel.app/contact"} className="text-[#FF4A02]">  Contact Page </Link> . Please see our Terms of Service for more details.</p>
          <p className="mt-5 font-medium text-sm text-gray-500">Read our Community Guidelines and Privacy Policy to understand how we operate and manage your information. For detailed information on how we protect your data, visit our Privacy Policy . By using our services, you agree to our Terms of Service . Thank you for choosing Us.</p>
        </div>
      </div>
    </footer >
  );
}

export default Footer;