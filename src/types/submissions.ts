export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  interest: string | null;
  message: string;
  created_at: string;
};

export type DiscoverySubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string;
  industry: string;
  business_type: string;
  years_operating: string;
  audience: string;
  interests: string[];
  learn_topics: string[] | null;
  learn_other: string | null;
  build_services: string[] | null;
  build_details: string | null;
  budget: string;
  timeline: string;
  scale_features: string[] | null;
  scale_other: string | null;
  referral_source: string | null;
  message: string | null;
  created_at: string;
  status: string;
  status_notes: string | null;
};
