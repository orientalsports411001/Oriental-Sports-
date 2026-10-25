'use client';

/**
 * Compatibility shim that reproduces the slice of the react-router-dom API
 * this codebase used (Link, NavLink, useNavigate, useParams, useLocation,
 * useSearchParams), implemented on top of Next.js App Router primitives.
 *
 * This exists purely to make the mechanical SPA -> Next.js port tractable:
 * every ported component/page imports from here instead of
 * 'react-router-dom', with call sites unchanged (`<Link to="...">`,
 * `useNavigate()`, etc.).
 */

import React from 'react';
import NextLink from 'next/link';
import {
  useRouter,
  useParams as useNextParams,
  usePathname,
  useSearchParams as useNextSearchParams,
} from 'next/navigation';

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, 'href'> & {
  to?: string;
  href?: any;
};

export const Link: React.FC<LinkProps> = ({ to, href, ...props }) => {
  const destination = to || href || '/';
  return <NextLink href={destination} {...props} />;
};

type NavLinkClassName = string | ((args: { isActive: boolean }) => string);

interface NavLinkProps extends Omit<React.ComponentProps<typeof NextLink>, 'href' | 'className'> {
  to: string;
  className?: NavLinkClassName;
  end?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, className, end, ...rest }) => {
  const pathname = usePathname() || '/';
  const isActive = end
    ? pathname === to
    : pathname === to || (to !== '/' && pathname.startsWith(`${to}/`));
  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className;
  return <NextLink href={to} className={resolvedClassName} {...rest} />;
};

export const useNavigate = () => {
  const router = useRouter();
  return (to: string | number) => {
    if (typeof to === 'number') {
      router.back();
      return;
    }
    router.push(to);
  };
};

export const useParams = useNextParams;

export const useLocation = () => {
  const pathname = usePathname() || '/';
  const searchParams = useNextSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return { pathname, search, hash: '', state: null as any, key: 'default' };
};

type SetSearchParams = (
  next:
    | Record<string, string>
    | URLSearchParams
    | ((prev: URLSearchParams) => URLSearchParams | Record<string, string>),
  options?: { replace?: boolean }
) => void;

export const useSearchParams = (): [URLSearchParams, SetSearchParams] => {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const current = useNextSearchParams();
  const params = new URLSearchParams(current.toString());

  const setSearchParams: SetSearchParams = (next, options) => {
    let resolved: Record<string, string> | URLSearchParams;
    if (typeof next === 'function') {
      resolved = next(new URLSearchParams(current.toString()));
    } else {
      resolved = next;
    }
    const nextParams = resolved instanceof URLSearchParams ? resolved : new URLSearchParams(resolved);
    const qs = nextParams.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    if (options?.replace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  };

  return [params, setSearchParams];
};
