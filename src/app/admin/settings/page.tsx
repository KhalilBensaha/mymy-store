import { getCategories } from "@/lib/actions/categories";
import {
  getFeaturedCategoryIds,
  getContactSettings,
  getSiteLanguage,
  getSocialLinks,
} from "@/lib/actions/settings";
import SettingsClient from "./settings-client";

export const revalidate = 0;

export default async function SettingsPage() {
  const [allCategories, initialFeaturedIds, initialContactInfo, initialLanguage, initialSocialLinks] =
    await Promise.all([
      getCategories(),
      getFeaturedCategoryIds(),
      getContactSettings(),
      getSiteLanguage(),
      getSocialLinks(),
    ]);

  return (
    <SettingsClient
      allCategories={allCategories}
      initialFeaturedIds={initialFeaturedIds}
      initialContactInfo={initialContactInfo}
      initialLanguage={initialLanguage}
      initialSocialLinks={initialSocialLinks}
    />
  );
}
