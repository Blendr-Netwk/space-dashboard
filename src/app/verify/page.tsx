import { MainContainer } from "@/components/container/MainContainer";
import VerifySection from "@/components/sections/space/verifySection/verifySection";
import { Suspense, useEffect } from "react";

export default function VerifyPage() {
  return (
    <MainContainer>
      <Suspense>
        <VerifySection />
      </Suspense>
    </MainContainer>
  );
}
