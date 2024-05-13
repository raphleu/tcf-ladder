"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import "../globals.css";

const navigation = [
  { name: "Ladder", href: "#", current: true },
  { name: "Matches", href: "#", current: false },
  { name: "About", href: "#", current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  let windowWidth = window.innerWidth;
  let windowScroll = window.scrollY;
  let logoMaxHeight = windowWidth / 3 > 144 ? windowWidth / 3 : 144;
  let parallaxMaxHeight = -windowWidth / 36 + 132;

  let parallaxHeight =
    parallaxMaxHeight - windowScroll > 0 ? parallaxMaxHeight - windowScroll : 0;

  let stickyNavContainerHeight = parallaxMaxHeight + logoMaxHeight * 0.37;

  const [logoHeight, setLogoHeight] = useState(
    computeLogoHeight(
      parallaxHeight,
      windowScroll,
      logoMaxHeight,
      parallaxMaxHeight
    )
  );

  useEffect(() => {
    const parallaxElement = document.querySelector(".parallax");

    const parallax = () => {
      let scrolled = window.scrollY;

      if (parallaxElement) {
        parallaxHeight =
          parallaxMaxHeight - scrolled > 0 ? parallaxMaxHeight - scrolled : 0;

        parallaxElement.style.height = `${parallaxHeight}px`;

        setLogoHeight(
          computeLogoHeight(
            parallaxHeight,
            scrolled,
            logoMaxHeight,
            parallaxMaxHeight
          )
        );
      }
    };

    window.addEventListener("scroll", parallax);

    return () => {
      window.removeEventListener("scroll", parallax);
    };
  }, []);

  return (
    <>
      <div
        className="navbar sticky top-0 min-w-full z-10"
        style={{ height: stickyNavContainerHeight + 30 + "px" }}
      >
        <div className="bg-gentle-pink min-w-full" id="nav-c">
          <div className="relative flex mx-auto w-1280 px-1 lg:px-24 xl:px-36">
            <div className="flex items-center justify-center sm:items-stretch sm:justify-start my-4">
              <div className={"flex flex-shrink-0 items-center "}>
                <Image
                  src="/logo-no-bg.png" // Route of the image file
                  height={logoHeight} // Desired size with correct aspect ratio 144
                  width={logoHeight} // Desired size with correct aspect ratio 144
                  alt="tcf-ladder-logo"
                />
              </div>
            </div>
            <div className="right-0 flex flex-grow pr-2 sm:static sm:inset-auto justify-end">
              <div className="flex space-x-4">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 my-6 text-sm font-medium h-8"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            id="headerJumbotron"
            className="jumbotron parallax px-4 s:px-24 md:px-24 lg:px-32 xl:px-44"
            style={{ height: parallaxHeight + "px" }}
          >
            <div className="container md:text-xl lg:text-xl">
              <p>
                Welcome to the TCF 2024 ladder! Join the ladder to connect with
                fellow club members, challenge new players and spark a little
                competition!
              </p>
              <p>
                <a className="btn btn-primary btn-lg" href="#" role="button">
                  Learn more »
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function computeLogoHeight(
  paralaxHeight: number,
  scrollAmount: number,
  logoMaxHeight: number,
  logoScrollShrinkPoint: number
) {
  if (paralaxHeight > 0) {
    return logoMaxHeight;
  }

  console.log("logo shrink point: " + logoScrollShrinkPoint);
  console.log("scroll amount: " + scrollAmount);

  const widthToHeightLogoRatio = 2.7432;
  const logoMinHeight = 144;

  return logoMaxHeight -
    (scrollAmount - logoScrollShrinkPoint) * widthToHeightLogoRatio >
    logoMinHeight
    ? logoMaxHeight -
        (scrollAmount - logoScrollShrinkPoint) * widthToHeightLogoRatio
    : logoMinHeight;
}
