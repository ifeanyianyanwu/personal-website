import { ChevronDownIcon } from "@sanity/icons/ChevronDown";
import { ChevronUpIcon } from "@sanity/icons/ChevronUp";
import { Box, Button, Card, Flex, Grid, Stack, Text } from "@sanity/ui";
import { useState } from "react";
import type { NavbarProps } from "sanity";

/** Ifeanyi's own reminder of what makes a good plot point. Edit freely. */
const ideas = [
  ["Builds", "Demo days, launches, hackathons, robotics experiments, things built for LetsDap."],
  ["Food", "A new dish or a recipe of my own, Nigerian classics like ofe akwu, a stir-fry, a pasta I finally got right. Use the recipe field."],
  ["Drawings", "Sketches as the sketchbook reopens: the first one, then one every so often."],
  ["Chess", "Club nights, a first win, a tournament, a position worth keeping."],
  ["Life", "Graduation, lawn tennis, gym milestones, the yes-for-the-plot moments."],
  ["Travel", "Places in Malta that mean something, and new places as they come."],
] as const;

const tips = [
  "One moment per plot point, with the real date.",
  "Photos of me doing the thing beat staged shots. Credit photos I didn't take.",
  "Clips: 5 to 15 seconds, MP4, under 20 MB. They play muted on a loop.",
  "Keep off: family, money, health, immigration, private work.",
];

const KEY = "posting-note-open";

/** A slim strip above the Studio navbar that opens into the posting ideas. Remembers open or closed. */
export function PostingNote(props: NavbarProps) {
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem(KEY) !== "closed";
    } catch {
      return true;
    }
  });
  const toggle = () => {
    setOpen(!open);
    try {
      localStorage.setItem(KEY, open ? "closed" : "open");
    } catch {}
  };

  return (
    <>
      <Card tone="primary" borderBottom paddingX={3} paddingY={2}>
        <Flex align="center" gap={3}>
          <Box flex={1}>
            <Text size={1} weight="medium">
              What to post: one real moment, built, cooked, drawn, played or lived. For the plot.
            </Text>
          </Box>
          <Button
            mode="bleed"
            fontSize={1}
            padding={2}
            text={open ? "Hide ideas" : "Show ideas"}
            iconRight={open ? ChevronUpIcon : ChevronDownIcon}
            onClick={toggle}
            aria-expanded={open}
          />
        </Flex>
        {open && (
          <Stack gap={4} paddingTop={3} paddingBottom={2}>
            <Grid gridTemplateColumns={[1, 2, 3]} gap={3}>
              {ideas.map(([category, idea]) => (
                <Stack key={category} gap={2}>
                  <Text size={1} weight="semibold">
                    {category}
                  </Text>
                  <Text size={1} muted>
                    {idea}
                  </Text>
                </Stack>
              ))}
            </Grid>
            <Stack gap={2}>
              {tips.map((tip) => (
                <Text key={tip} size={1} muted>
                  · {tip}
                </Text>
              ))}
            </Stack>
          </Stack>
        )}
      </Card>
      {props.renderDefault(props)}
    </>
  );
}
