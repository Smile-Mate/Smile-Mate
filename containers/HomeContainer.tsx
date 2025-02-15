"use client";

import BottomPortal from "@/components/BottomPortal";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function HomeContainer() {
  return (
    <Container>
      <div className="flex h-[90vh] w-full">
        <Image
          src={"/svg/logo.svg"}
          alt="Logo"
          width={200}
          height={200}
          className="m-auto"
        />
      </div>
      <BottomPortal>
        <Link href="/login">
          <Button>시작하기</Button>
        </Link>
      </BottomPortal>
    </Container>
  );
}
