import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

const LETTER_BODY = `Hey Princess. Im not sure if you'll even see this lmao.

Hope you are doing good. Hope your flu ended and you are ok now. Hope everything is doing better and all and you are really okkk.

After the break and then you sent me the paragraph and spoke your heart out ig I was in so much. Like so much emotions at once, felt sorry, sad, confused, hurt, relieved, lowkey happy, all emotions and couldn't really express what I would say thats why im sending this rn cause ive some to terms and im ik rnn.

We started talking on July 22, I remember that night.

I remember everything to the smallest details Princess.

I remember you prefer juice than tea or coffee, I remember how we planned we'd have a tatto date and I remember you wanted a back one and spine one if you'll be ready.

I remember how we were talking about pirating movies and crunchy roll for anime and how we'd never pay.

How mbappe would go crazy watching the new Exposito movie where she kisses another dude and ig does more than that.

I remember you giving me the link to the free Spotify plan for two months, I have to pay btw before they take their money from my Mpesa lol.

How you told me you felt when you watched videos of heights and felt scared.

How you felt disappointed when your dye didn't turn out red and turned out brownish. I really like the color though it's still really nice.

I remember you telling me you were watching sterling point and off campus which I never really finished I'll finish it😭

I remember your laugh lmaooo, time you made me laugh esp telling me how you were playing charades with Maina and Manu and talking about Nairobi topic Manu said kiroboto kwa kikamba, laughed my ass off ngl.

How you felt bad going to Garden city alone as solo date and you saw people with dates and told yourself you'd never go there again.

How you loved lamine before olise, How we talked how we'd lick Olises legs me with one you with other,

How we talked of Dembeles wife and her elegant style esp the cowboy ish vibe style, how we talked of sakina.

How you told me Sam and cat was your fav Nickelodeon show esp when they made collabs with other shows like Henry danger etc, and how you liked Victorious and Fairy odd parents.

How we talked and admired Millie Bobbie and her platonic relationship with Noah,

How you were skipping driving school classes and eloping to some local🤣🤣

How we played pool in imessages and it was really fun, didn't let you win fs i still feel you let me have win at some points.

Lemme not get to our imessages texts🤣 i still cherish the moments ig

Even our WhatsApp texts with Nyot and njeri might be cringe rn but it was fun

Also how you saw Darwin's dih as a kid lmaoooo

I remember how you even liked The luo guy called Gravin

I remember the many kittens you showed me they were really cute btw, also Tommy

And also Summer may she rest in peace

I hope you still like Pinacolada ice cream and chocolate ganache cake ty for putting me to them

Also how your favorite power rangers movie is Dino charge

Also your brother Felix doing his finals this year, wish him the best

I could go on for so long but I just cherished every moment and they all mean so much to me that's why I can't forget for sure and I really enjoyed every single one and you are really special to me

Maybe not in terms of dating rn but as a really special friend.

Elsie ty for all what we shared and even if we had a bucket list with so many stuff still unchecked but doesn't matter rn anyway it was fun making it with you.

I really wanted to know so much about you even what no one cared to know. I had already made so much progress lollll.

Also really wanted we go to movies together since you've never been there I almost bought tickets lmao.

At some point we though we were twins lmao

Have same music taste it's crazyyyyyy

And many things in common.

And im really glad you liked me.

I'll still think of you when I listen to Gracie abrams and Noah and Don Toliver and Ed.

Ig after we started dating and I started to notice the distance ig I didn't want to accept it at all. I was in denial so ig I really tried to keep what was sinking afloat by sending many texts, love bombing, reassurances, and I even acted weird at some point idkk but all this was cause of the anxious attachments and ig made me do all that as I didn't know really yk and so much many things which made situation worse. I didn't realize

Even before the break I had realized this might be gone but didn't want to accept it at really wanted all to work but it's really okkk it didn't work like we wanted which is really ok but atleast we got to share so much.

I mean I wasn't perfect also. This was my first relationship ig I was really nervous and had anxious attachment and really overthought and so much more esp when the spark disappeared and couldn't talk normally and all and pressured to do everything right and that's where I went wrong, disappointed myself couple times and also you, and also really sorry for some stuff might have been overwhelming to you and you didn't like and just couldn't tell me. And we both had our flaws but doesn't matter as much.

But I had to accept it was ending and I was really afraid of this from the start but it's easier when I accept it and I'm really Okk with everything rn and come to terms with it. Ik you really cared for me and you were really afraid to hurt my feelings, ty for that and many more things.

Elsie I really love you and appreciate you and care for you, maybe as someone like a really close friend rn. You can always reach out if you ever want to talk, no pressure at all. But what we had was really good even if it had couple of rough parts I did enjoy what was good, what was bad ig it's life and nothing really and has already happened but I could change couple of stuff if I had ability but I can't rnnn and I cried some point cause I saw this coming.

Anywayyy thats all I had to say before it's a close to the dating chapter. Im still really glad you are my first kiss i still cherish it and many stuff, even if we did a lot that maybe we shouldn't have.

But I've learnt to accept that the relationship didn't work and it's okay as long you are really comfortable, i just want to see you happy and all.

Oh and btw normally im called karani not Ted but after you called me that normally it just hit different and I liked it it was just a tiny detail i lowkey liked.

Ty Elsie stay safe princess.

Olise wannabe.`;

export default function FarewellLetter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 pl-3 pr-4 py-3 rounded-full shadow-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-400 hover:to-pink-400 transition-all active:scale-[0.97]"
        style={{ boxShadow: "0 0 30px rgba(244,114,182,0.5)" }}
        aria-label="Open letter"
      >
        {/* outer pulsing rings */}
        <motion.span
          className="absolute inset-0 rounded-full bg-pink-400/50"
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-rose-400/40"
          animate={{ scale: [1, 2.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />

        {/* "new" badge */}
        <motion.span
          className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-amber-400 text-[9px] font-bold text-zinc-900 border-2 border-zinc-900 uppercase tracking-wider"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          New
        </motion.span>

        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
          className="relative z-10"
        >
          <Heart className="w-5 h-5" fill="currentColor" />
        </motion.div>
        <span className="relative z-10 text-sm font-semibold tracking-wide">Click me, I'm new!</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-zinc-900/95 to-rose-950/80 border border-pink-500/30 shadow-2xl shadow-pink-500/10"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-pink-500/10 hover:bg-pink-500/20 transition-colors"
              >
                <X className="w-5 h-5 text-pink-300" />
              </button>

              <div className="p-8 sm:p-10 space-y-5">
                <p className="text-xl text-pink-200 font-serif italic">Elsie</p>
                <div className="text-pink-200/80 leading-relaxed whitespace-pre-wrap text-[15px]">
                  {LETTER_BODY}
                </div>

                <div className="flex items-center justify-center gap-3 pt-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-500/30" />
                  <Heart className="w-4 h-4 text-pink-400/50" fill="currentColor" />
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-500/30" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}