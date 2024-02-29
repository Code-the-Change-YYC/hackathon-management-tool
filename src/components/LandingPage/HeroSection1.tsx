// import Image from "next/image";
// import Link from "next/link";
// // import PropTypes from "prop-types";
// import type { ReactNode } from "react";

// import HeroSectionBackground from "/public/images/landingpage/HeroSection/hero_section_background.png";

// const heroSectionStyles =
//   "relative flex -mt-5 justify-between py-4 md:py-15 md:px-24 lg:px-40 drop-shadow-lg md:drop-shadow-none";

// const heroTileStyles = "mx-10 mt-20 md:mt-10 ";
// const linkStyles =
//   "my-3 md:my-4 flex justify-start font-bold md:justify-center";
// const webPageContainerStyles = "h-[25rem] rounded-t-md bg-[#00D3A9] opacity-90";

// interface HeroTileProps {
//   children: ReactNode;
//   //   eventName: string;
//   //   eventYear: string;
//   //   eventBlurb: string;
//   //   eventDate: number;
// }

// const heroDetails = {
//   eventName: "Hack the Change",
//   eventYear: "2024",
//   eventBlurb:
//     "Hack the Change 2024 is a hybrid two-day for-charity hackathon with the mission of coding a better world together.",
//   eventDate: 1709227457,
// };

// const HeroDetails = ({ children }: HeroTileProps) => {
//   return (
//     <div className={heroTileStyles}>
//       <div>
//         <h1
//           className="mt-20 flex-wrap text-5xl font-black text-[#FFFF] drop-shadow-lg md:text-center md:text-6xl"
//           style={{
//             textShadow: `
//     -2px -2px 0 #7055FD,
//     2px -2px 0 #7055FD,
//     -2px 2px 0 #7055FD,
//     2px 2px 0 #7055FD,
//     -2px -2px 0 #7055FD,
//     2px -2px 0 #7055FD,
//     -2px 2px 0 #7055FD,
//     2px 2px 0 #7055FD
// `,
//           }}
//         >
//           {" "}
//           {children}
//           <span className="text-[#BAFBE4]"> {children}</span>
//         </h1>
//         <strong className="text-1xl my-4 flex flex-wrap justify-center text-[#7055FD] opacity-95  md:text-center md:text-xl lg:px-40">
//           {children}
//         </strong>
//       </div>
//       <div className={linkStyles}>
//         <Link href="/" legacyBehavior>
//           <div className=" cursor-pointer rounded-2xl border-4 border-white bg-[#7055FD] px-6 py-2 text-sm text-white opacity-90 hover:opacity-70 md:px-6">
//             Join Hackathon
//           </div>
//         </Link>
//       </div>
//       <div className={linkStyles}>
//         <p>
//           Already registered?
//           <Link href="/" legacyBehavior>
//             <span className="text-1xl cursor-pointer text-[#7055FD] opacity-90 hover:opacity-70">
//               {" "}
//               Sign in
//             </span>
//           </Link>
//         </p>
//       </div>
//       <div className={webPageContainerStyles}>
//         <div className="rounded-t-md border-t-[30px] border-white">
//           <div className="container mx-auto p-4">
//             <div className="m-2 h-[25rem] rounded-t-3xl bg-[#BAFBE4] opacity-90 md:m-5">
//               <h1 className="p-5 text-center text-2xl font-bold text-[#7055FD]">
//                 {children} begins...{" "}
//               </h1>
//               <div>{children}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Define PropTypes for HeroTile
// // HeroTile.propTypes = {
// //   eventName: PropTypes.string.isRequired,
// //   eventYear: PropTypes.string.isRequired,
// //   eventBlurb: PropTypes.string.isRequired,
// //   eventDate: PropTypes.number.isRequired,
// // };

// const HeroSection1 = () => {
//   return (
//     <div className={heroSectionStyles}>
//       <Image
//         src={HeroSectionBackground}
//         alt="Landing page background"
//         layout="fill"
//         placeholder="blur"
//         objectFit="cover"
//       />
//       {heroDetails.map((values, index) => (
//         <div key={index}>
//           <HeroTile {...values} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HeroSection1;
