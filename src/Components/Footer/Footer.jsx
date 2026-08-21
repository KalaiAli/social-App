import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faGithub,
  faApple,
  faTwitter,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "Feed", href: "#feed" },
      { label: "Discover", href: "#discover" },
      { label: "Communities", href: "#communities" },
      { label: "Trending", href: "#trending" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Press Kit", href: "#press" },
      { label: "Contact", href: "#contact" },
    ],
    resources: [
      { label: "Help Center", href: "#help" },
      { label: "Safety Center", href: "#safety" },
      { label: "Community Rules", href: "#rules" },
      { label: "Verification", href: "#verify" },
    ],
  };

  const socialIcons = [
    {
      icon: faInstagram,
      href: "https://www.instagram.com/",
      label: "Instagram",
    },
    {
      icon: faTwitter,
      href: "https://x.com/",
      label: "Twitter / X",
    },
    {
      icon: faFacebook,
      href: "https://www.facebook.com/",
      label: "Facebook",
    },
    {
      icon: faYoutube,
      href: "https://www.youtube.com/",
      label: "YouTube",
    },
    {
      icon: faGithub,
      href: "https://github.com/",
      label: "GitHub",
    },
  ];

  return (
    <footer className="w-full border-t border-gray-200 bg-white text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Social<span className="text-blue-600">Connect</span>
            </span>

            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Connect with friends, share your unique moments, and discover
              communities tailored just for you.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              {socialIcons.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-900"
                >
                  <FontAwesomeIcon icon={icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                {category}
              </h3>

              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-blue-600 dark:hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Downloads */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-y border-gray-100 py-8 dark:border-gray-900 sm:flex-row">
          <div>
            <h4 className="text-base font-medium text-gray-900 dark:text-white">
              Take us with you
            </h4>

            <p className="mt-1 text-xs text-gray-400">
              Download our native apps for the best mobile experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* App Store */}
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-2 text-white transition-all hover:bg-black"
            >
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider opacity-75">
                  Download on the
                </p>

                <p className="-mt-0.5 font-sans text-sm font-semibold">
                  App Store
                </p>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="https://play.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-2 text-white transition-all hover:bg-black"
            >
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider opacity-75">
                  Get it on
                </p>

                <p className="-mt-0.5 font-sans text-sm font-semibold">
                  Google Play
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <p>&copy; {currentYear} SocialConnect Inc. All rights reserved for Kalai Ali.</p>

          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-blue-600">
              Privacy Policy
            </a>

            <a href="#terms" className="hover:text-blue-600">
              Terms of Service
            </a>

            <a href="#cookies" className="hover:text-blue-600">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
