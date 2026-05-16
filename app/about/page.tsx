"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  Star,
  Target,
  Heart,
  Zap,
  Award,
  Globe,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Rocket,
  Shield,
} from "lucide-react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,

  Typography,
  Avatar,
  Stack,
} from "@mui/material";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JSX } from "react";

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface Value {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const stats: Stat[] = [
  { icon: Users, value: "10,000+", label: "Contestants" },
  { icon: Star, value: "5M+", label: "Total Votes" },
  { icon: Trophy, value: "₦15M+", label: "Prizes Awarded" },
  { icon: Globe, value: "36", label: "States Represented" },
];

const values: Value[] = [
  {
    icon: Lightbulb,
    title: "Creativity First",
    description:
      "We believe everyone has creative potential. Our platform provides the stage for that potential to shine.",
  },
  {
    icon: Shield,
    title: "Fair Competition",
    description:
      "Transparent voting, clear rules, and equal opportunities for all contestants regardless of background.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description:
      "Built by creatives, for creatives. Our community shapes every decision we make.",
  },
  {
    icon: Rocket,
    title: "Career Launch",
    description:
      "Beyond prizes, we connect winners with industry opportunities, mentorship, and exposure.",
  },
];

const team: TeamMember[] = [
  {
    name: "Adaora Nwosu",
    role: "Founder & CEO",
    bio: "Former creative director with a passion for discovering emerging talent.",
    image: "/team/adaora.jpg",
  },
  {
    name: "Emeka Okafor",
    role: "Head of Operations",
    bio: "Event management expert with 10+ years in the creative industry.",
    image: "/team/emeka.jpg",
  },
  {
    name: "Fatima Ibrahim",
    role: "Creative Director",
    bio: "Award-winning designer and advocate for youth creative education.",
    image: "/team/fatima.jpg",
  },
  {
    name: "Tunde Adeleke",
    role: "Technology Lead",
    bio: "Tech entrepreneur focused on building platforms that empower creators.",
    image: "/team/tunde.jpg",
  },
];

const milestones: Milestone[] = [
  {
    year: "2022",
    title: "The Beginning",
    description:
      "Creative Edge launched with 1,500 contestants and a vision to transform creative competitions in Nigeria.",
  },
  {
    year: "2023",
    title: "Rapid Growth",
    description:
      "Expanded to 3 categories, partnered with major brands, and reached over 2,000 contestants.",
  },
  {
    year: "2024",
    title: "Going Big",
    description:
      "Largest edition yet with ₦5M prize pool, international judges, and nationwide university tours.",
  },
  {
    year: "2025",
    title: "The Future",
    description:
      "Planning West African expansion, launching creator studio, and introducing new competition formats.",
  },
];

export default function AboutPage(): JSX.Element {
  return (
    <Box sx={{ bgcolor: "#0B0B0F", color: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 14, md: 18 },
          pb: { xs: 10, md: 14 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 100,
            right: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            bgcolor: "primary.main",
            opacity: 0.1,
            filter: "blur(120px)",
          }}
        />

        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Chip
                icon={<Heart size={16} />}
                label="Our Story"
                color="primary"
                variant="outlined"
              />

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.7rem", md: "5rem" },
                  lineHeight: 1.1,
                  maxWidth: "900px",
                }}
              >
                Empowering{" "}
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(90deg,#7c3aed,#06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Creative Talent
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: "700px",
                  fontSize: "1.1rem",
                }}
              >
                Creative Edge is Nigeria&apos;s premier platform for discovering,
                celebrating, and launching the careers of young creative talents
                through exciting competitions.
              </Typography>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* STATS */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          py: 8,
          bgcolor: "rgba(255,255,255,0.02)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Stack spacing={2} sx={{ alignItems: 'center' }}>
                      <Icon size={36} color="#7c3aed" />

                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 800 }}
                      >
                        {stat.value}
                      </Typography>

                      <Typography color="rgba(255,255,255,0.6)">
                        {stat.label}
                      </Typography>
                    </Stack>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* MISSION */}
      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Chip
                  icon={<Target size={16} />}
                  label="Our Mission"
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 3 }}
                />

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 4,
                    lineHeight: 1.2,
                  }}
                >
                  Discovering Tomorrow&apos;s Creative Leaders Today
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    mb: 3,
                    lineHeight: 1.8,
                  }}
                >
                  We started Creative Edge with a simple belief: talent exists
                  everywhere, but opportunity doesn&apos;t.
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    mb: 5,
                    lineHeight: 1.8,
                  }}
                >
                  Through our competitions, we&apos;ve seen photographers gain
                  recognition, fashion designers launch brands, and graphic
                  artists land dream jobs.
                </Typography>

                <Stack spacing={3}>
                  {[
                    "Provide equal opportunities for all creative talents",
                    "Connect emerging artists with industry professionals",
                    "Build a supportive community",
                    "Celebrate African creativity globally",
                  ].map((item) => (
                    <Stack
                      key={item}
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: 'center' }}
                    >
                      <CheckCircle color="#7c3aed" size={22} />

                      <Typography>{item}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={3}>
                {[
                  { icon: Award, label: "Excellence" },
                  { icon: Users, label: "Community" },
                  { icon: Zap, label: "Innovation" },
                  { icon: Heart, label: "Passion" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <Grid size={{ xs: 6 }} key={item.label}>
                      <Card
                        sx={{
                          bgcolor: "rgba(255,255,255,0.05)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 4,
                        }}
                      >
                        <CardContent sx={{ py: 5 }}>
                          <Stack spacing={2} sx={{ alignItems: 'center' }}>
                            <Icon size={38} color="#7c3aed" />

                            <Typography sx={{ fontWeight: 700 }}>
                              {item.label}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* VALUES */}
      <Box
        sx={{
          py: { xs: 10, md: 16 },
          bgcolor: "rgba(255,255,255,0.02)",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center', mb: 8 }}>
            <Chip
              icon={<Star size={16} />}
              label="Our Values"
              color="primary"
              variant="outlined"
            />

            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              What We Stand For
            </Typography>

            <Typography color="rgba(255,255,255,0.7)">
              These core values guide everything we do at Creative Edge.
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <Grid size={{ xs: 12, md: 6, lg: 3 }} key={value.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        bgcolor: "rgba(255,255,255,0.05)",
                        borderRadius: 4,
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 3,
                            bgcolor: "rgba(124,58,237,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 3,
                          }}
                        >
                          <Icon size={28} color="#7c3aed" />
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                          {value.title}
                        </Typography>

                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            lineHeight: 1.8,
                          }}
                        >
                          {value.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* TEAM */}
      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center', mb: 8 }}>
            <Chip
              icon={<Users size={16} />}
              label="The Team"
              color="primary"
              variant="outlined"
            />

            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              Meet The Team
            </Typography>

            <Typography color="rgba(255,255,255,0.7)">
              Passionate people dedicated to empowering creative talents.
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 3 }} key={member.name}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      borderRadius: 5,
                      overflow: "hidden",
                      bgcolor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Box
                      sx={{
                        height: 220,
                        background:
                          "linear-gradient(135deg,#7c3aed33,#06b6d433)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 90,
                          height: 90,
                          bgcolor: "rgba(255,255,255,0.15)",
                        }}
                      >
                        <Users size={40} />
                      </Avatar>
                    </Box>

                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {member.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#7c3aed",
                          mb: 2,
                          fontWeight: 600,
                        }}
                      >
                        {member.role}
                      </Typography>

                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          lineHeight: 1.8,
                        }}
                      >
                        {member.bio}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Card
            sx={{
              borderRadius: 6,
              overflow: "hidden",
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <CardContent sx={{ py: 10, px: 4 }}>
              <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, maxWidth: "700px" }}
                >
                  Join Our Community
                </Typography>

                <Typography
                  sx={{
                    maxWidth: "650px",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "1.05rem",
                  }}
                >
                  Whether you&apos;re a contestant, supporter, or partner,
                  there&apos;s a place for you in the Creative Edge family.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                >
                  <Button
                    component={Link}
                    href="/register"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight size={18} />}
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Become a Contestant
                  </Button>

                  <Button
                    component={Link}
                    href="/contact"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      textTransform: "none",
                      color: "#ffffff",
                      borderColor: "rgba(255,255,255,0.2)",
                    }}
                  >
                    Partner With Us
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}