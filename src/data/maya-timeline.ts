import type { CalendarEvent, Task, Channel, Message, DashboardMetric } from '../types'

export const PUB_DATE = new Date('2026-08-25')

export const METRICS: DashboardMetric[] = [
  { label: 'Kickstarter Backers', value: '5,000+', trend: 'up', detail: '$600K raised' },
  { label: 'Amazon Pre-orders', value: '0', trend: 'down', detail: 'Needs activation' },
  { label: 'Publication Date', value: 'Aug 25, 2026', trend: 'neutral' },
  { label: 'Days to Pub', value: calculateDaysToPub(), trend: 'neutral' },
  { label: 'Galley Goal', value: '2,500 downloads', detail: '750 pre-pub reviews' },
  { label: 'Early Copies', value: '214 allocated', detail: '114 reps + 50 media + 50 stores' },
]

function calculateDaysToPub(): string {
  const now = new Date()
  const diff = PUB_DATE.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days > 0 ? `${days}` : 'Published!'
}

export const CHANNELS: Channel[] = [
  { id: 'general', name: 'general', icon: '💬', unread: 3, description: 'General coordination between AE and DOL' },
  { id: 'assets', name: 'assets', icon: '🎨', unread: 4, description: 'Cover art, banners, video clips, marketing materials' },
  { id: 'marketing', name: 'marketing', icon: '📣', unread: 2, description: 'Amazon, TikTok, Goodreads, Netgalley campaigns' },
  { id: 'conferences', name: 'conferences', icon: '🎪', unread: 1, description: 'SDCC, NYCC, ABA coordination' },
  { id: 'reviews', name: 'reviews-press', icon: '📰', unread: 0, description: 'Trade reviews, press outreach, awards' },
  { id: 'preorders', name: 'preorders', icon: '📦', unread: 1, description: 'Preorder campaigns, giveaways, book clubs' },
]

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ce-1', title: 'Goodreads Giveaway: 10 Galleys', date: new Date('2026-05-01'), endDate: new Date('2026-06-01'), category: 'giveaway', description: 'Premium $599 — 10 galleys, customized letter to all entrants', owner: 'AE', priority: 'high' },
  { id: 'ce-2', title: 'Goodreads Giveaway: 25 Early Copies', date: new Date('2026-07-01'), endDate: new Date('2026-08-01'), category: 'giveaway', description: 'Premium $599 — 25 early copies', owner: 'AE', priority: 'high' },
  { id: 'ce-3', title: 'Early Copies in Warehouse', date: new Date('2026-07-22'), category: 'milestone', description: 'Finished books arrive at warehouse', owner: 'Both', priority: 'critical' },
  { id: 'ce-4', title: 'SDCC 2026', date: new Date('2026-07-23'), endDate: new Date('2026-07-26'), category: 'conference', description: 'San Diego Comic-Con — need finished books for booth', owner: 'DOL', priority: 'critical' },
  { id: 'ce-5', title: 'Publication Day', date: new Date('2026-08-25'), category: 'milestone', description: 'MAYA: Seed Takes Root official publication', owner: 'Both', priority: 'critical' },
  { id: 'ce-6', title: 'Goodreads Kindle Giveaway: 100 copies', date: new Date('2026-09-15'), category: 'giveaway', description: '100 Kindle copies, repeat every 8 weeks', owner: 'AE', priority: 'medium' },
  { id: 'ce-7', title: 'NYCC 2026', date: new Date('2026-10-08'), endDate: new Date('2026-10-11'), category: 'conference', description: 'New York Comic-Con', owner: 'DOL', priority: 'critical' },
  { id: 'ce-8', title: 'Netgalley DRC Upload', date: new Date('2026-05-15'), category: 'deadline', description: 'Upload finished-pages digital review copy when cover/interior ready', owner: 'AE', priority: 'high' },
  { id: 'ce-9', title: 'Edelweiss DRC Upload', date: new Date('2026-05-15'), category: 'deadline', description: 'Upload finished-pages digital review copy to Edelweiss', owner: 'AE', priority: 'high' },
  { id: 'ce-10', title: 'Amazon A+ Content Launch', date: new Date('2026-06-01'), category: 'marketing', description: 'Activate A+ content with world map, character art, universe infographic', owner: 'Both', priority: 'high' },
  { id: 'ce-11', title: 'Amazon Ads Launch', date: new Date('2026-06-15'), category: 'marketing', description: 'Begin keyword ads targeting comp ASINs', owner: 'AE', priority: 'high' },
  { id: 'ce-12', title: 'TikTok Shop Listing', date: new Date('2026-08-25'), category: 'marketing', description: 'List book in TikTok shop at publication date', owner: 'Both', priority: 'medium' },
  { id: 'ce-13', title: 'Hugo Award Submission', date: new Date('2027-03-01'), category: 'deadline', description: '2027 eligibility, WSFS deadline spring 2027', owner: 'Both', priority: 'medium' },
  { id: 'ce-14', title: 'Bespoke Bookstore Mailing', date: new Date('2026-07-25'), category: 'marketing', description: 'Top 50 bookstores — red glasses + letter from Don', owner: 'AE', priority: 'high' },
  { id: 'ce-15', title: 'Preorder Offer Launch', date: new Date('2026-06-01'), category: 'marketing', description: 'Define and launch preorder event / gift with purchase / bonus materials', owner: 'Both', priority: 'high' },
  { id: 'ce-16', title: 'ALC Audiobook Load', date: new Date('2026-05-01'), category: 'asset', description: 'Load advanced listening copy ASAP — major sales tool with Hugo Weaving', owner: 'Both', priority: 'critical' },
  { id: 'ce-17', title: 'Storygraph Giveaway', date: new Date('2026-05-01'), endDate: new Date('2026-06-01'), category: 'giveaway', description: '5 print + 5 digital ARCs, concurrent with Goodreads', owner: 'AE', priority: 'medium' },
]

export const TASKS: Task[] = [
  // Asset Requests from DOL
  { id: 't-1', title: 'Final Cover Delivery', description: 'Finalize cover — #1 priority. May already be complete.', status: 'in-progress', owner: 'DOL', category: 'Assets', priority: 'critical' },
  { id: 't-2', title: 'New Hightail Folder (Final Cover)', description: 'Set up new Hightail folder with final cover only. Mark old cover as character art.', status: 'todo', owner: 'DOL', category: 'Assets', priority: 'high' },
  { id: 't-3', title: 'Fix Broken Asset Folder Link', description: 'Old Hightail link broken — send new link for asset folder', status: 'todo', owner: 'DOL', category: 'Assets', priority: 'high', dueDate: new Date('2026-04-30') },
  { id: 't-4', title: 'Instagram Video Clip for Booksellers', description: 'Provide IG reel clip for booksellers and Amazon page: instagram.com/reels/DRm14evjryF/', status: 'todo', owner: 'DOL', category: 'Assets', priority: 'high' },
  { id: 't-5', title: 'Edit YouTube Video with New Cover', description: 'Edit youtube.com/watch?v=ywuPOFHYWZ8 to land on new cover for book materials', status: 'todo', owner: 'DOL', category: 'Assets', priority: 'high' },
  { id: 't-6', title: 'Edelweiss Banner (900×200)', description: '900x200 banner for Edelweiss catalog — GIF max 200kb or JPG/PNG. Feature cover + character art.', status: 'todo', owner: 'Both', category: 'Assets', priority: 'high', dueDate: new Date('2026-05-15') },

  // Metadata & Retail
  { id: 't-7', title: 'Audit Retailer Pages', description: 'Audit Amazon, Edelweiss, Ingram, B&N for correct metadata', status: 'todo', owner: 'AE', category: 'Metadata', priority: 'high' },
  { id: 't-8', title: 'Verify ISBN Feeds', description: 'Verify all 3 formats feeding correctly: PB 9798893311891, E 9798893311778, Audio 9781668157992', status: 'todo', owner: 'AE', category: 'Metadata', priority: 'high' },
  { id: 't-9', title: 'Claim Amazon Author Pages', description: 'Claim and verify author pages for Anand Gandhi and Zain Memon on Amazon', status: 'todo', owner: 'DOL', category: 'Amazon', priority: 'high' },
  { id: 't-10', title: 'Amazon A+ Content', description: 'Activate A+ Content with world map, character art (Weta/Barlowe), universe infographic', status: 'todo', owner: 'Both', category: 'Amazon', priority: 'high' },
  { id: 't-11', title: 'Amazon Keyword Research', description: 'Comp ASINs: Ready Player One, Mistborn, Name of the Wind, The Poppy War', status: 'todo', owner: 'AE', category: 'Amazon', priority: 'medium' },

  // Goodreads & Storygraph
  { id: 't-12', title: 'Claim Goodreads Author Profiles', description: 'Claim and verify profiles for Anand Gandhi and Zain Memon', status: 'todo', owner: 'DOL', category: 'Goodreads', priority: 'high' },
  { id: 't-13', title: 'Set Up Goodreads Book Page', description: 'Link to Kindle edition, add series shelf', status: 'todo', owner: 'AE', category: 'Goodreads', priority: 'high' },
  { id: 't-14', title: 'Storygraph Portal Setup', description: 'Add book — mood tags: adventurous, dark, mysterious; pacing: fast; fiction/fantasy', status: 'todo', owner: 'AE', category: 'Storygraph', priority: 'medium' },

  // Marketing & Outreach
  { id: 't-15', title: 'Share Active Projects Schedule', description: 'Provide schedule so AE can translate into excitement for sales reps/booksellers', status: 'todo', owner: 'DOL', category: 'Marketing', priority: 'high' },
  { id: 't-16', title: 'Share Email List & Promo Plans', description: 'Provide email list and set plans for promotion', status: 'todo', owner: 'DOL', category: 'Marketing', priority: 'high' },
  { id: 't-17', title: 'Share Contacts/Partnerships List', description: 'People/companies in conversation with, and desired connections', status: 'todo', owner: 'DOL', category: 'Marketing', priority: 'high' },
  { id: 't-18', title: 'Share Book/Universe Hooks List', description: 'List of "hooks" about the book/universe for AE to build upon', status: 'todo', owner: 'DOL', category: 'Marketing', priority: 'high' },
  { id: 't-19', title: 'TikTok Influencer Outreach', description: 'Pull accounts promoting bestselling SFF, send influencer/swag bundles', status: 'todo', owner: 'Both', category: 'TikTok', priority: 'medium' },
  { id: 't-20', title: 'Book Club Submissions', description: 'Email BOTM, Belletrist, Literati, Reese\'s Book Club scout — already submitted to BOTM', status: 'in-progress', owner: 'AE', category: 'Book Clubs', priority: 'high' },
  { id: 't-21', title: 'Create Book Club Kit', description: 'Discussion questions, author Q&A form, world-map PDF, character guide', status: 'todo', owner: 'Both', category: 'Book Clubs', priority: 'medium' },

  // Trade Reviews
  { id: 't-22', title: 'Submit to Trade Publications', description: 'PW, Library Journal, Booklist, Kirkus, Shelf Awareness, BookPage', status: 'todo', owner: 'AE', category: 'Reviews', priority: 'high' },
  { id: 't-23', title: 'Edition Zero Recipient List', description: 'Provide list of Edition Zero recipients so AE can resubmit to Reactor, Locus, io9', status: 'todo', owner: 'DOL', category: 'Reviews', priority: 'medium' },

  // Audio
  { id: 't-24', title: 'Load ALC Audiobook', description: 'Load advanced listening copy ASAP — Hugo Weaving narration is the #1 conversion lever', status: 'todo', owner: 'Both', category: 'Audio', priority: 'critical' },
  { id: 't-25', title: 'Create Audiograms', description: 'Create audiograms for promotion, Amazon page, Edelweiss, review outlets', status: 'todo', owner: 'Both', category: 'Audio', priority: 'high' },

  // Netgalley
  { id: 't-26', title: 'Netgalley Setup & Feature Submissions', description: 'Upload DRC, set Request mode, submit to Cover Love, SFF Category Features ($190), SFF Featured Email ($800)', status: 'todo', owner: 'AE', category: 'Netgalley', priority: 'high' },

  // Awards
  { id: 't-27', title: 'Awards Strategy Development', description: 'Hugo, Nebula, World Fantasy, Locus — leverage Neil Clarke\'s WSFS relationships', status: 'todo', owner: 'Both', category: 'Awards', priority: 'medium', dueDate: new Date('2027-03-01') },
]

export const SEED_MESSAGES: Message[] = [
  {
    id: 'm-1', channelId: 'general', author: 'Sarah (AE)', avatar: 'SE',
    content: 'Welcome to TagChat! This is our coordination hub for MAYA: Seed Takes Root. All timeline items from our planning doc have been loaded into the Dashboard and Calendar.',
    timestamp: new Date('2026-04-14T09:00:00'),
  },
  {
    id: 'm-2', channelId: 'general', author: 'System', avatar: '⚡',
    content: '27 tasks imported from the Authors Equity timeline. 17 calendar events created. Check the Dashboard for the full breakdown.',
    timestamp: new Date('2026-04-14T09:01:00'),
  },
  {
    id: 'm-3', channelId: 'assets', author: 'Sarah (AE)', avatar: 'SE',
    content: 'Priority #1: We need the final cover. Once that\'s locked, we can produce the Edelweiss banner (900×200, max 200kb GIF/JPG/PNG). Also — the old Hightail link is broken, can someone send a fresh one?',
    timestamp: new Date('2026-04-14T09:05:00'),
  },
  {
    id: 'm-4', channelId: 'assets', author: 'Sarah (AE)', avatar: 'SE',
    content: 'We\'d also love that Instagram reel clip (instagram.com/reels/DRm14evjryF/) for booksellers + Amazon. And can the YouTube video be re-edited to land on the new cover?',
    timestamp: new Date('2026-04-14T09:06:00'),
    attachments: [{ name: 'Instagram Reel', url: 'https://www.instagram.com/reels/DRm14evjryF/', type: 'link' }],
  },
  {
    id: 'm-5', channelId: 'marketing', author: 'Sarah (AE)', avatar: 'SE',
    content: 'Amazon pre-orders are at ZERO right now. We need to get the product page live with correct metadata and start keyword research. Comp ASINs: Ready Player One, Mistborn, Name of the Wind, The Poppy War.',
    timestamp: new Date('2026-04-14T09:10:00'),
  },
  {
    id: 'm-6', channelId: 'marketing', author: 'System', avatar: '⚡',
    content: 'Reminder: Hugo Weaving audiobook is identified as the single biggest conversion lever. Lead with it everywhere in marketing.',
    timestamp: new Date('2026-04-14T09:11:00'),
  },
  {
    id: 'm-7', channelId: 'conferences', author: 'Sarah (AE)', avatar: 'SE',
    content: 'SDCC is July 23-26 — we\'re collaborating with production to get finished books there on time. Warehouse date is 7/22, cutting it extremely close. NYCC is Oct 8-11.',
    timestamp: new Date('2026-04-14T09:15:00'),
  },
  {
    id: 'm-8', channelId: 'reviews', author: 'Sarah (AE)', avatar: 'SE',
    content: 'Trade review submissions going out to Publishers Weekly, Library Journal, Booklist, Kirkus, Shelf Awareness, and BookPage. We\'ll offer physical copies when ready.',
    timestamp: new Date('2026-04-14T09:20:00'),
  },
  {
    id: 'm-9', channelId: 'preorders', author: 'Sarah (AE)', avatar: 'SE',
    content: 'We need to define the preorder event — gift with purchase or bonus materials. AE will share with booksellers and our list, DOL activates with email/Kickstarter subscribers.',
    timestamp: new Date('2026-04-14T09:25:00'),
  },
  {
    id: 'm-10', channelId: 'general', author: 'Sarah (AE)', avatar: 'SE',
    content: 'Quick note: if any documents need translation, we have Versitage\'s Insight tool (protected AI) for quick translations. Not perfect but enough to keep everyone aligned.',
    timestamp: new Date('2026-04-14T09:30:00'),
  },
]
