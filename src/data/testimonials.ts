export interface Testimony {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export const testimonials: Testimony[] = [
  {
    quote:
      "Andy played a crucial role in launching this new product: from shaping the user experience and performing deep UX research to ensuring seamless integration of design and workflows across the broader LogicMonitor platform. What impressed me most was his ability to translate complex technical requirements into intuitive user experiences.",
    author: "David Femino",
    role: "Sr. Manager, PM - Cloud & Logs",
    company: "LogicMonitor",
    avatar: "/images/Home/David.webp",
  },
  {
    quote:
      "Beyond the enthusiasm, Andy is a model of professionalism and is extremely knowledgeable about the intricacies of enterprise UX, AI, and AIOps. The next organization will gain a truly valuable team member who elevates the entire design process through smart strategy, collaborative spirit, and a deep technical understanding. Highly recommended!",
    author: "Richard Huddleston",
    role: "Technical Fellow",
    company: "LogicMonitor",
    avatar: "/images/Home/richard.webp",
  },
  {
    quote:
      "He really used his holistic approach to make some real impact for us as a business and for our customers. Andy has been fantastic as a coach, motivator and project leader to our global cross functional teams. His fast approach towards getting empathetic insights from customers and transforming it into iterative testing was refreshing.",
    author: "Volker Probst",
    role: "Customer Experience VP",
    company: "Align Technology",
    avatar: "/images/Home/volker.webp",
  },
];
