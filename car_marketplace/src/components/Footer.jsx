import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";


function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">
  <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="flex justify-center text-teal-600">
      <img src="/assets/logo.svg" alt="" />
    </div>

    <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa cum
      itaque neque.
    </p>

    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
      <li>
        <a className="text-gray-700 transition hover:text-gray-400" href="#"> About </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> History </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Services </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Projects </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Blog </a>
      </li>
    </ul>

    <ul className="mt-12 flex justify-center gap-6 md:gap-8">
      <li>
        <a
          href="#"
          className="text-gray-700 transition hover:text-gray-700/75"
        >
          <span className="sr-only">Facebook</span>
          <FaFacebook className="size-6" />
        </a>
      </li>

      <li>
        <a
          href="#"
          className="text-gray-700 transition hover:text-gray-700/75"
        >
          <span className="sr-only">Instagram</span>
          <RiInstagramFill className="size-6" />
        </a>
      </li>

      <li>
        <a
          href="#"
          className="text-gray-700 transition hover:text-gray-700/75"
        >
          <span className="sr-only">Email</span>
            <SiGmail className="size-6" />
        </a>
      </li>
    </ul>
  </div>
</footer>
  )
}

export default Footer