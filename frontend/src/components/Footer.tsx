function Footer(): React.FunctionComponentElement<React.ReactNode> {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()}. Made with ❤️ by{" "}
          <a href="https://baitsli.com" target="_blank" rel="noreferrer">
            <span className="text-customGreen dark:text-customPurple font-bold">
              Belks
            </span>
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
