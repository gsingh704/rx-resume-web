const Footer = ({ showAttribution }) => {
  if (!showAttribution) {
    return null;
  }

  return (
    <div className="text-center text-gray-500 dark:text-gray-400 mt-10 py-6 border-t dark:border-gray-700">
      <p className="mb-1">
        Generated with
        <a
          href="https://www.github.com/gsingh704/Reactive-Resume-Web"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-indigo-500 dark:text-indigo-400"
        >
          Reactive Resume Web Generator
        </a>
      </p>
    </div>
  );
};

export default Footer;