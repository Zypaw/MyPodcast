export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  duration: string;
  date: string;
  image: string;
  audioUrl: string;
  featured?: boolean;
  topics: string[];
  host: string;
  guest?: string;
}

// Sample podcast data with placeholder audio
export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "1",
    title: "The Future of AI and Human Creativity",
    description: "Exploring how artificial intelligence is reshaping creative industries and what it means for human creators.",
    longDescription: "In this thought-provoking episode, we dive deep into the evolving relationship between artificial intelligence and human creativity. From AI-generated art and music to collaborative tools enhancing human capabilities, we explore the opportunities and challenges that arise as these technologies become more sophisticated. Our guest, Dr. Maya Chen, shares insights from her research at the intersection of cognitive science and machine learning, discussing how creativity might be redefined in an age where machines can generate novel content. We also address concerns about authenticity, the value of human expression, and how creative professionals can adapt to a landscape where AI is an increasingly capable creative partner.",
    duration: "52:14",
    date: "2023-05-15",
    image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    featured: true,
    topics: ["Technology", "AI", "Creativity"],
    host: "Alex Rivera",
    guest: "Dr. Maya Chen"
  },
  {
    id: "2",
    title: "Sustainable Living in Urban Environments",
    description: "Practical strategies for reducing your environmental footprint while living in a busy city.",
    longDescription: "Urban living presents unique challenges for those wanting to live more sustainably. In this episode, we talk with environmental architect Sophia Kim about innovative approaches to sustainable urban living. From community gardens and vertical farming to energy-efficient housing designs and public transportation alternatives, we explore practical ways city dwellers can reduce their environmental impact without sacrificing quality of life. Sophia shares inspiring examples from cities around the world that are leading the way in sustainable urban development, as well as simple changes anyone can implement in their daily routines. We also discuss the importance of policy changes and community initiatives in creating more sustainable urban environments for everyone.",
    duration: "45:32",
    date: "2023-04-28",
    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    topics: ["Environment", "Urban Living", "Sustainability"],
    host: "Morgan Lee",
    guest: "Sophia Kim"
  },
  {
    id: "3",
    title: "The Science of Sleep: Optimizing Your Rest",
    description: "Neuroscientist Dr. James Foster explains the latest research on sleep and how to improve your nightly rest.",
    longDescription: "Sleep is essential for our physical and mental well-being, yet many of us struggle to get quality rest. In this episode, neuroscientist Dr. James Foster breaks down the complex science of sleep, explaining the different sleep stages and their functions in physical and cognitive restoration. We discuss common sleep disorders, the impact of modern technology on our sleep patterns, and evidence-based strategies for improving sleep quality. Dr. Foster shares insights from his research on the relationship between sleep and memory consolidation, and offers practical advice for establishing healthy sleep routines. We also explore fascinating topics like lucid dreaming, the evolutionary purpose of dreams, and how sleep needs change throughout our lifespan.",
    duration: "63:05",
    date: "2023-04-10",
    image: "https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    topics: ["Health", "Neuroscience", "Wellness"],
    host: "Alex Rivera",
    guest: "Dr. James Foster"
  },
  {
    id: "4",
    title: "Financial Independence Through Mindful Investing",
    description: "Strategies for building wealth and achieving financial freedom with purpose-driven investments.",
    longDescription: "What does it mean to be truly financially independent, and how can mindful investing help you get there? In this episode, we're joined by financial advisor and author Rebecca Wong to discuss approaches to investing that align with your values while building long-term wealth. Rebecca explains the principles of sustainable investing, how to evaluate companies based on environmental and social governance, and why a long-term mindset is crucial for financial success. We explore practical steps for getting started with investing at any income level, common pitfalls to avoid, and how to build a diversified portfolio that reflects your priorities. Rebecca also shares insights on balancing financial goals with quality of life, and why true wealth extends beyond just monetary assets.",
    duration: "58:21",
    date: "2023-03-22",
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    featured: true,
    topics: ["Finance", "Personal Development", "Investing"],
    host: "Morgan Lee",
    guest: "Rebecca Wong"
  },
  {
    id: "5",
    title: "The Art of Storytelling in Digital Media",
    description: "Award-winning filmmaker Jordan Chen discusses how storytelling principles evolve across different digital platforms.",
    longDescription: "Storytelling remains a powerful tool for connection and communication, but how is it evolving in the digital age? Award-winning filmmaker Jordan Chen joins us to explore storytelling techniques across various digital media platforms, from social media and podcasts to interactive experiences and virtual reality. Jordan shares insights from his career creating compelling narratives for diverse audiences and platforms, discussing how core storytelling principles remain consistent while adaptation is necessary for different formats. We examine successful case studies in digital storytelling, the role of audience participation in modern narratives, and how emerging technologies are opening new possibilities for immersive storytelling experiences. Jordan also offers practical advice for aspiring digital storytellers looking to develop their craft and find their unique voice.",
    duration: "49:47",
    date: "2023-03-05",
    image: "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    topics: ["Arts", "Digital Media", "Storytelling"],
    host: "Alex Rivera",
    guest: "Jordan Chen"
  },
  {
    id: "6",
    title: "Mindfulness Practices for Busy Professionals",
    description: "Simple, science-backed techniques to incorporate mindfulness into your daily routine even with a packed schedule.",
    longDescription: "In our fast-paced world, finding time for mindfulness can seem impossible for busy professionals. Dr. Olivia Grant, psychologist and mindfulness researcher, shares practical approaches to incorporating mindfulness into even the busiest schedules. We discuss the science behind mindfulness and its proven benefits for stress reduction, decision-making, and overall wellbeing. Dr. Grant introduces several short practices that can be integrated into everyday activities like commuting, eating, or transitioning between tasks. We explore common obstacles to maintaining a mindfulness practice and strategies for overcoming them. The conversation also touches on how mindfulness can improve workplace relationships, enhance focus in a distraction-filled environment, and contribute to better work-life balance without requiring hours of meditation.",
    duration: "41:18",
    date: "2023-02-15",
    image: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    topics: ["Wellness", "Mental Health", "Productivity"],
    host: "Morgan Lee",
    guest: "Dr. Olivia Grant"
  }
];