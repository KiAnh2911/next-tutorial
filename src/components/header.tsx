"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import ButttonLogout from "./buttton-logout";

export default function Header() {
  return (
    <div className="flex space-x-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/products">Sản phẩm</Link>
        </li>
        <li>
          <Link href="/login">Đăng nhập</Link>
        </li>
        <li>
          <Link href="/register">Đăng ký</Link>
        </li>
        <li>
          <ButttonLogout />
        </li>
        {/* {user ? (
          <>
            <li>
              <Link href={"/me"}>
                Xin chào <strong>{user.name}</strong>
              </Link>
            </li>
            <li>
              <ButttonLogout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Đăng nhập</Link>
            </li>
            <li>
              <Link href="/register">Đăng ký</Link>
            </li>
          </>
        )} */}
      </ul>
      <ModeToggle />
    </div>
  );
}
