import { SiteChrome } from "@/components/site-chrome";
import SiteNotFound from "./(site)/not-found";

/** Unmatched URLs render outside `(site)`, so this one adds the chrome itself. */
export default function NotFound() {
  return (
    <SiteChrome>
      <SiteNotFound />
    </SiteChrome>
  );
}
