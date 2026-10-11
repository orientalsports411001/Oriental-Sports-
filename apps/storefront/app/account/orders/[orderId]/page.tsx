import { AccountPage } from '@/components/pages/AccountPage';

export default function Page() {
  // orderId is read client-side (e.g. via useParams/useSearchParams in OrderTracker)
  // if deep-linking to a specific order is implemented; the tab is all this
  // route needs server-side, mirroring the original /account/orders/:orderId route.
  return <AccountPage tab="orders" />;
}
