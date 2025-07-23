"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
const pathname = usePathname();
const isHomePage = pathname === "/";

return (
<footer className="bg-secondary text-secondary-foreground border-t border-border mt-10 w-full">
{isHomePage && (
<div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
<div>
<h2 className="text-lg font-semibold mb-2">About</h2>
<p>ShopNext is your go-to store for books, gadgets and more.</p>
</div>

        <div className="px-0 md:px-24">
        <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
        <ul className="space-y-1">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link href="/dashboard/products" className="hover:underline">Products</Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className="hover:underline">Admin</Link>
          </li>
          <li>
        <Link href="/auth/contact" className="hover:underline">Contact Us</Link>
    </li>
        </ul>
      </div>

      <div className="px-0 md:px-24">
        <h2 className="text-lg font-semibold mb-2">Connect</h2>
        <ul className="space-y-1">
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
          </li>
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
          </li>
        </ul>
      </div>
    </div>
  )}

      <div className="text-center text-xs text-muted-foreground py-4 border-t border-border">
        &copy; {new Date().getFullYear()} ShopNext. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
