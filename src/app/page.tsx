"use client";

import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
  useIDKit,
} from "@worldcoin/idkit";
import { usePrivy } from "@privy-io/react-auth";
import { verify } from "./actions/verify";

export default function Home() {
  const appId = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION as string;
  const { ready, login } = usePrivy();

  const onSuccess = (result: ISuccessResult) => {
    window.alert(
      `Successfully verified with World ID!
      Your nullifier hash is: ` + result.nullifier_hash
    );
  };

  const { setOpen } = useIDKit();

  const proof = async (result: ISuccessResult) => {
    console.log("Proof received, sending backend: \n", JSON.stringify(result));
    const data = await verify(result);
    if (data.success) {
      alert("Success response from backend");
    } else {
      throw new Error("Failed");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center align-middle h-screen">
        <p className="text-2xl mb-5">World ID</p>
        <IDKitWidget
          action={action}
          app_id={appId}
          onSuccess={onSuccess}
          handleVerify={proof}
          verification_level={VerificationLevel.Device}
        />
        <button
          className="border border-black rounded-md bg-white p-2 text-black"
          onClick={() => setOpen(true)}
        >
          <div className="mx-3 my-1">Login with World ID</div>
        </button>
        <button
          onClick={login}
          className="border border-black rounded-md bg-white p-2 text-black"
        >
          <div className="mx-3 my-1">Login with wallet</div>
        </button>
      </div>
    </div>
  );
}
