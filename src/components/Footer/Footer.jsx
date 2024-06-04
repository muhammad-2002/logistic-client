import React from "react";

const Footer = () => {
  return (
    <footer class=" mt-12 bg-[#2A2A2A] ">
      <div class="container px-6 py-12 mx-auto ">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          <div>
            <p class="font-semibold text-gray-800 dark:text-white">
              Quick Link
            </p>
            <hr className="w-[30px] border-[#FDC300] border-[2px] my-2"></hr>

            <div class="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Home
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Who We Are
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Our Philosophy
              </a>
            </div>
          </div>

          <div>
            <p class="font-semibold text-gray-800 dark:text-white">
              Industries
            </p>
            <hr className="w-[30px] border-[#FDC300] border-[2px] my-2"></hr>

            <div class="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Retail & E-Commerce
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Information Technology
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Finance & Insurance
              </a>
            </div>
          </div>

          <div>
            <p class="font-semibold text-gray-800 dark:text-white">Services</p>
            <hr className="w-[30px] border-[#FDC300] border-[2px] my-2"></hr>

            <div class="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Super Fast Delivery
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Authentic Collection
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Emergency Delivery
              </a>
            </div>
          </div>

          <div>
            <p class="font-semibold text-gray-800 dark:text-white">
              Contact Us
            </p>
            <hr className="w-[30px] border-[#FDC300] border-[2px] my-2"></hr>
            <div class="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                +880 768 473 4978
              </a>
              <a
                href="#"
                class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                info@logisticinternational.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="flex bg-[#17469E]  flex-col items-center justify-center py-5 sm:flex-row">
        <p class="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-white font-semibold">
          © Copyright 2024. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
