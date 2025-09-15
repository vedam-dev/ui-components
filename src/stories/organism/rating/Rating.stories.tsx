import type { Meta, StoryObj } from "@storybook/react";
import RatingCard from "../../../component/organism/rating/Rating";

const meta: Meta<typeof RatingCard> = {
  title: "Organism/RatingCard",
  component: RatingCard,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Main heading text (e.g. 'Overall Rating')",
    },
    value: {
      control: { type: "number", min: 0, max: 5, step: 0.5 },
      description: "Rating value (0 to max)",
    },
    max: {
      control: { type: "number", min: 3, max: 10, step: 1 },
      description: "Maximum number of stars",
    },
    readOnly: {
      control: "boolean",
      description: "Make rating non-editable",
    },
    backgroundImage: {
      control: {
        type: "select",
        options: ["default", "custom", "none"],
        mapping: {
          default:
            "https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Container-2.png",
          custom: "/images/rating-bg-alt.png",
          none: undefined,
        },
      },
      description:
        "Background image containing all visual design elements (gradient, decorative stars, etc.)",
    },
    onChange: {
      action: "ratingChanged",
      description: "Callback when rating value changes",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A reusable rating component that displays a title and star rating over a background image. The background image should contain all visual design elements (gradient, decorative stars, borders, etc.) while the component only renders the functional text and rating stars.",
      },
    },
  },
} satisfies Meta<typeof RatingCard>;

export default meta;
type Story = StoryObj<typeof RatingCard>;

export const Default: Story = {
  args: {
    title: "Overall Rating",
    value: 4,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default rating card with the standard background image and 4-star rating.",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    title: "Rate this Experience",
    value: 3,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive rating card where users can click to change the rating value (full stars only).",
      },
    },
  },
};

export const CustomTitle: Story = {
  args: {
    title: "Service Quality",
    value: 5,
    readOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Rating card with custom title text.",
      },
    },
  },
};

export const EmptyRating: Story = {
  args: {
    title: "Not Rated Yet",
    value: 0,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Rating card with no stars filled, ready for user input.",
      },
    },
  },
};

export const FullRating: Story = {
  args: {
    title: "Excellent Experience",
    value: 4,
    readOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Rating card with 4 full stars - no half-star support.",
      },
    },
  },
};

export const CustomMaxStars: Story = {
  args: {
    title: "Scale of 1-10",
    value: 7,
    max: 10,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Rating card with custom maximum number of stars (10 instead of 5).",
      },
    },
  },
};

export const WithoutBackground: Story = {
  args: {
    title: "Plain Rating",
    value: 4,
    readOnly: true,
    backgroundImage: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Rating card without background image - shows fallback styling.",
      },
    },
  },
};
