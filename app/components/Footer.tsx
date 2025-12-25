export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-600 sm:flex-row sm:px-6">
        <p className="text-center sm:text-left">
          © {year} YOLO ADVENTURES PTE. LTD. All rights reserved.
        </p>
        <nav aria-label="Footer links">
          <ul className="flex items-center gap-5">
            <li>
              <a href="/privacy" className="hover:text-gray-900 transition">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-gray-900 transition">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 transition" aria-label="Twitter">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 transition" aria-label="LinkedIn">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 transition" aria-label="GitHub">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
