import { Link } from "wouter";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import SunLogo from "./SunLogo";

export default function Footer() {
  const footerLinks = {
    Shop: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "Best Sellers", href: "/shop?filter=bestsellers" },
    ],
    Help: [
      { label: "Sizing Guide", href: "/sizing" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
    ],
    About: [
      { label: "Our Story", href: "/about" },
      { label: "Lookbook", href: "/lookbook" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4" data-testid={`text-footer-${category.toLowerCase()}`}>
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-sm text-muted-foreground hover:text-primary transition-colors hover-elevate px-2 py-1 rounded-xl inline-block font-medium" data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="flex items-center gap-2 text-xl font-bold text-primary" data-testid="link-footer-logo">
                <SunLogo size={28} animate={false} />
                Lumio
              </a>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Lumio. All rights reserved.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" data-testid="button-social-facebook">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-social-instagram">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-social-twitter">
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
