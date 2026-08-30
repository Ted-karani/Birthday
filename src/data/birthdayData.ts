import type { BirthdayReason, LoveCoupon, PolaroidMemory, LoveLetter, CustomSettings } from "@/types";
import photo1 from "@/assets/photo-06.jpg";
import photo2 from "@/assets/photo-07.webp";
import photo3 from "@/assets/photo-08.jpg";
import photo4 from "@/assets/photo-03.jpg";

export const defaultSettings: CustomSettings = {
  herName: "Elsie",
  petName: "Princess",
  age: 19,
  birthdate: "2007-08-31",
  anniversary: "2024-01-01",
};

export const defaultReasons: BirthdayReason[] = [
  { id: 1, title: "You Make Me Laugh", content: "I love how you make me laugh without even trying.", category: "funny" },
  { id: 2, title: "That Laugh", content: "I love your weird little laugh 😭 it's genuinely one of my favorite things about you.", category: "funny" },
  { id: 3, title: "Being Myself", content: "I love how easy it feels to be myself around you.", category: "deep" },
  { id: 4, title: "Special Conversations", content: "I love how you somehow make normal conversations feel special.", category: "sweet" },
  { id: 5, title: "Unserious Energy", content: "I love your sense of humor and how unserious you can be.", category: "funny" },
  { id: 6, title: "The Little Things", content: "I love how caring you are, even in the little things.", category: "sweet" },
  { id: 7, title: "Mood Booster", content: "I love how you can make my whole mood better just by talking to me.", category: "sweet" },
  { id: 8, title: "Shy Moments", content: "I love how shy you can be sometimes — it's actually so cute.", category: "sweet" },
  { id: 9, title: "Passion", content: "I love how passionate you get about the things you care about.", category: "deep" },
  { id: 10, title: "Unapologetically You", content: "I love that you're not afraid to be your weird self around me.", category: "sweet" },
  { id: 11, title: "Feeling Appreciated", content: "I love the way you make me feel appreciated.", category: "deep" },
  { id: 12, title: "The Unnoticed Things", content: "I love all the little things about you that you probably don't even realize I notice.", category: "sweet" },
  { id: 13, title: "Best Part of My Day", content: "I love how talking to you has become one of the parts of my day I look forward to.", category: "sweet" },
  { id: 14, title: "Memories", content: "I love how you've given me memories I know I'll always smile about.", category: "future" },
  { id: 15, title: "Understanding Me", content: "I love how you understand me even when I don't explain myself properly.", category: "deep" },
  { id: 16, title: "Your Personality", content: "I love your personality more than I think I'll ever be able to put into words.", category: "deep" },
  { id: 17, title: "Just You", content: "I love that you're you — you don't have to try to be anyone else.", category: "deep" },
  { id: 18, title: "Becoming Important", content: "I love the way you've slowly become such an important person to me.", category: "future" },
  { id: 19, title: "Because You're Elsie", content: "I love you because you're Elsie. There are a million reasons I could list, but at the end of the day, it's just you that I fell for. 🫶🏽", category: "future" },
];

export const defaultCoupons: LoveCoupon[] = [
  { id: 1, title: "Boba Run", description: "One unlimited boba tea run -- your choice, my treat.", redeemed: false },
  { id: 2, title: "Unlimited Hugs", description: "A coupon for as many hugs as you want, whenever you want them.", redeemed: false },
  { id: 3, title: "Chef's Romantic Dinner", description: "I cook your favorite meal, candlelight, no phones allowed.", redeemed: false },
  { id: 4, title: "Star Gazing Night", description: "Blanket, snacks, and the whole sky just for us.", redeemed: false },
  { id: 5, title: "Movie Marathon", description: "Pick three movies. I handle popcorn and blankets.", redeemed: false },
  { id: 6, title: "Weekend Getaway", description: "Just us, somewhere new, no plans except being together.", redeemed: false },
];

export const defaultPolaroids: PolaroidMemory[] = [
  { id: 1, caption: "That look you give when you're being sassy", tag: "Iconic", imageUrl: photo1 },
  { id: 2, caption: "The face you make when I say something dumb", tag: "Funny", imageUrl: photo2 },
  { id: 3, caption: "Headphones on, world off, main character energy", tag: "Mood", imageUrl: photo3 },
  { id: 4, caption: "Dressed up and looking unreal", tag: "Stunning", imageUrl: photo4 },
];

export const defaultLetter: LoveLetter = {
  salutation: "Happy birthdayyy my princess 🥹❤️",
  body: `I honestly don't even know where to start because somehow, in such a short time, you've become such a special person to me. It's kinda crazy to think that all of this started from something as simple as talking about Olise 😭 and now here we are.

I just want you to know how grateful I am that I met you. I love the way you make conversations feel different, your humour, your random moments, that weird addictive laugh of yours 😭, and honestly just the person you are. There's something about you that makes me genuinely enjoy having you in my life.

And I know I can sometimes be a little too attached or overthink things 😭, but it's only because I actually care about you. I'm still learning how all of this works because I've never really had something like this before, but I'm happy that I get to experience it with you.

There's also something I've been a little scared to admit. Sometimes I think about the possibility that things might change between us one day, and honestly, that thought scares me more than I like to admit — not because I expect promises, but because you already mean so much to me. If our paths ever went different ways, I know I'd miss you, the conversations, the laughs, all of it. But I'd still rather have known and loved you than never have had you at all. You've already left a mark on my heart I'll always be grateful for. So I'm choosing to love you because of how important you are to me right now, not out of fear of losing you.

You deserve to have an amazing birthday, not just because it's your birthday, but because you genuinely deserve good things. I hope this new year of your life brings you so much happiness, good memories, growth, and all the little things that make you smile.

And honestly, I hope I get to be part of some of those memories too. 🥹 Maybe even in person sometime, if you're brave enough to handle how awkward I'll probably be at first 😭

Thank you for being you, for letting me get to know you, and for making these past few months a lot more special than I expected them to be.

Happy birthday, Elsie ❤️
I hope 31st August treats the princess properly 👑😭
And just so you know… I'm really, really glad I found you.`,
  closing: "Forever (over)thinking about you,",
  signature: "❤️",
};
