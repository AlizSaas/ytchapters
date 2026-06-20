import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ChaptersWrapper from "@/components/ChaptersWrapper";
import {
  checkChapterCreationEligibility,
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/utils/stripe";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return redirect("/signin");
  }

  await createCustomerIfNull();

  const subscribed = await hasSubscription();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      savedChapters: true,
      stripe_customer_id: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  if (!user) {
    return redirect("/signin");
  }

  const manage_link = await generateCustomerPortalLink(
    "" + user?.stripe_customer_id
  );
  const checkout_link = await createCheckoutLink("" + user?.stripe_customer_id);

  const { isEligible, message } =
    await checkChapterCreationEligibility();

  return (
    <MaxWidthWrapper className="py-8 md:py-12 min-h-[calc(100vh-5rem)]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              👋 Welcome back, {session?.user?.name || "User"}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your generated chapters and create new ones.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/generate-chapters"
              className={buttonVariants({
                variant: "default",
                size: "sm",
              })}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chapters
            </Link>
            {subscribed.isSubscribed ? (
              <Link
                href={"" + manage_link}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                })}
              >
                Manage subscription
              </Link>
            ) : (
              <Link
                href={"" + checkout_link}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                })}
              >
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        {(isEligible || !isEligible) && (
          <div className="text-sm text-muted-foreground">
            {message}
          </div>
        )}
      </div>

      <ChaptersWrapper user={user && {
        savedChapters: user.savedChapters,
        stripe_customer_id: user.stripe_customer_id || ''
      }} />
    </MaxWidthWrapper>
  );
};

export default Page;