
export const BREAKOUT_THEMES = [
  {
    id: 'signin',
    title: 'Signing In',
    icon: '✍️',
    description: 'Welcome! Grab your name tag and start chatting.',
    details: 'The official kickoff. Use this time to meet the organizers and find your orientation.',
    groups: ['First Event', 'Returning', 'Referral', 'Social Media'],
    subtopics: ['Name Tags', 'Agenda Check', 'Event Vibe'],
    color: 'brand-yellow',
    textColor: 'text-black',
    tag: '6:00 PM START'
  },
  {
    id: 'scavenger',
    title: 'Scavenger Hunt',
    icon: '🔍',
    description: 'Match by name tag color or marker color!',
    details: 'Colors are your guide. Find a match for your name tag color or the marker you used. Great way to meet everyone!',
    groups: ['Red Match', 'Blue Match', 'Green Match', 'Yellow Match'],
    subtopics: ['Color Theory', 'Quick Intros', 'Seek & Find'],
    color: 'brand-orange',
    textColor: 'text-white',
    tag: '6:30 PM HUNT'
  },
  {
    id: 'interests',
    title: 'Foodies / Travelers',
    icon: '✈️',
    description: 'Favorite hobby or interest breakout groups.',
    details: 'Whether you live for the next meal or the next flight, find your adventure partners here.',
    groups: ['Global Foodies', 'Backpackers', 'Luxury Travel', 'Home Cooks'],
    subtopics: ['Secret NYC Eats', 'Solo Travel', 'Street Food'],
    color: 'brand-mint',
    textColor: 'text-black',
    tag: '6:45 PM KICKOFF'
  },
  {
    id: 'years',
    title: 'Career Stages',
    icon: '⏳',
    description: 'Under 5, 6-10, or 10+ years professional groups.',
    details: 'Find your cohort or seek mentorship from a different experience bracket.',
    groups: ['Under 5 Years', '6-10 Years', '10+ Veterans', 'Peer Match'],
    subtopics: ['Salary Negos', 'Mentorship', 'Growth Tips'],
    color: 'brand-blue',
    textColor: 'text-black',
    tag: '7:00 PM CAREER'
  },
  {
    id: 'industry',
    title: 'Industry Focus',
    icon: '💼',
    description: 'Marketing, Tech, Creative, or Finance?',
    details: 'Deep dive into your specific field. Share insights, trends, and cross-industry collaborations.',
    groups: ['Tech & Eng', 'Marketing & PR', 'Creative Arts', 'Finance & Accounting'],
    subtopics: ['AI Impact', 'Creator Economy', 'Market Trends'],
    color: 'brand-lime',
    textColor: 'text-black',
    tag: '7:15 PM DEPTH'
  },
  {
    id: 'grouppic',
    title: 'Group Photo',
    icon: '📸',
    description: "Gather around and let's take a picture! Tag us @asian.networking.nyc",
    details: 'Time to capture the memory of 5/15! Please head to the main backdrop for our group shot. Remember to tag us in your stories for a repost!',
    groups: ['Group Selfie', 'Silly Poses', 'Main Stage', 'Candid Zone'],
    subtopics: ['Smile!', 'Main Stage', 'Legacy shot'],
    color: 'brand-coral',
    textColor: 'text-white',
    tag: '7:30 PM SNAP'
  },
  {
    id: 'emoji',
    title: 'Emoji Match',
    icon: '🦄',
    description: "Find someone who sent the same last emoji!",
    details: 'Visual communication challenge. Also a great time to give feedback on the night.',
    groups: ['Emoji Match', 'Event Feedback', 'Sticker Share', 'Visual Story'],
    subtopics: ['Digital Tone', 'Emoji Stories', 'Feedback Hub'],
    color: 'white',
    textColor: 'text-black',
    tag: '7:45 PM VIBES'
  },
  {
    id: 'heritage',
    title: 'Asian Heritage',
    icon: '🌏',
    description: 'Heritage and language breakout groups.',
    details: 'A space to share experiences and connect through shared heritage and languages.',
    groups: ['Chinese', 'Korean', 'Filipino', 'Indian', 'Vietnamese', 'Taiwanese', 'Japanese', 'Cantonese'],
    subtopics: ['Dual Identity', 'Language Flow', 'Heritage Pride'],
    color: 'brand-pink',
    textColor: 'text-white',
    tag: '8:00 PM ROOTS'
  },
  {
    id: 'mbti',
    title: 'MBTI Hub',
    icon: '🧠',
    description: 'Are you an introvert or extrovert? Match your type.',
    details: 'Discover how your MBTI personality type influences your professional networking style.',
    groups: ['ENFJ', 'ENFP', 'ENTJ', 'ESFP', 'INFJ', 'INFP', 'INTJ'],
    subtopics: ['Social Battery', 'First Impressions', 'Trait Match'],
    color: 'brand-orange',
    textColor: 'text-white',
    tag: '8:15 PM PERSONALITY'
  },
  {
    id: 'commuter',
    title: 'Commuter Hub',
    icon: '📍',
    description: 'Queens, Brooklyn, NJ, or office locations.',
    details: 'Find locals from your neighborhood or coworkers from your office hub.',
    groups: ['Queens', 'Brooklyn', 'NJ', 'LI', 'SI', 'JC', 'Manhattan'],
    subtopics: ['Commute Hacks', 'Office Life', 'Local Gems'],
    color: 'brand-mint',
    textColor: 'text-black',
    tag: '8:30 PM LOCAL'
  },
  {
    id: 'wrapup',
    title: 'Wrap Up',
    icon: '🏁',
    description: 'Keep the conversations going and join our LinkedIn group!',
    details: 'The official session ends, but the networking continues. Exchange contacts and join our LinkedIn community!',
    groups: ['LinkedIn Group', 'Contact Swap', 'Final Drinks', 'Post-Event Hub'],
    subtopics: ['Community Hub', 'Next Meetup', 'Feedback'],
    color: 'brand-yellow',
    textColor: 'text-black',
    tag: '8:45 PM FINAL'
  }
];

export function parseTimeToMinutes(timeStr: string) {
  const match = timeStr.match(/(\d+):(\d+)\s+(AM|PM)/i);
  if (!match) return 0;
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && h < 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

export const getSessionMinutes = (tag: string) => {
  const timeMatch = tag.match(/(\d+:\d+\s+[AP]M)/i);
  return timeMatch ? parseTimeToMinutes(timeMatch[0]) : 0;
};
