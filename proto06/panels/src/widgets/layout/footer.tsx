import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";
import JSXRouteWrapper from "@/routes";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, made with{" "}
          {/* <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5" />  */}
          by{" "}
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500"
          >
            {brandName}.
          </a>{" "}
          {/* for a better web. */} All Rights Reserved
        </Typography>
        {import.meta.env.VITE_APP_STATUS == "development" && 
          <Typography>DEVELOPMENT MODE</Typography>
        }
        <ul className="flex items-center gap-4">
          {JSXRouteWrapper().routes.map(({ id, path }) => (
            <li key={`${id}_li_footer`}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Bitverse Team",
  brandLink: "https://bitverseph.com",
  routes: [
    { name: "Developer", path: "https://mattttyyyy.github.io/webportfolio" },
    { name: "Contact Us", path: "https://bitverseph.com/contact-us" },
    { name: "Blog", path: "https://bitverseph.com" },
    // { name: "License", path: "https://www.creative-tim.com/license" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.tsx";

export default Footer;
