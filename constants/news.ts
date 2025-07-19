export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  imageUrl: string;
  url: string;
  content?: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Liverpool FC Announces New Investment Structure for Fans',
    summary: 'Liverpool FC has unveiled a new investment program allowing fans to purchase equity shares in the club for the first time.',
    date: '2025-07-10',
    source: 'Sports Business Journal',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop&crop=center',
    url: '#',
    content: [
      'Liverpool FC has revolutionized fan engagement by launching an unprecedented equity investment program through Keeps Sport, allowing supporters to become genuine stakeholders in one of the world\'s most successful football clubs. This groundbreaking initiative represents the democratization of sports investment, breaking down traditional barriers that have long excluded ordinary fans from ownership opportunities.',
      'The programme enables fans to invest from as little as £500, with Keeps\' innovative platform facilitating the entire process. Early investors have already seen remarkable returns, with the club\'s valuation increasing by 24.5% since the programme\'s launch. This growth reflects both Liverpool\'s on-field success and the commercial potential unlocked by direct fan investment.',
      '"Investing in Liverpool via Keeps feels like finally having a real voice in the club\'s future. The transparency and returns are incredible!" shares James Mitchell, a New York-based investor who was among the first to participate in the programme.',
      'Keeps\' regenerative finance model ensures that dividends from Liverpool\'s commercial success are reinvested into the club\'s infrastructure and player development, creating a sustainable cycle of growth that benefits both the club and its investor-fans. This approach aligns perfectly with Liverpool\'s commitment to long-term excellence and community engagement.'
    ]
  },
  {
    id: '2',
    title: 'McLaren Racing\'s £50,000,000 Raise Nearly Sold Out in 24 Hours!',
    summary: 'Formula 1 team McLaren Racing has successfully raised £50,000,000 through a unique income sharing agreement with fans and investors.',
    date: '2025-07-05',
    source: 'Financial Times',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center',
    url: '#',
    content: [
      'McLaren Racing has achieved a remarkable milestone by raising nearly £50,000,000 in just 24 hours through Keeps Sport\'s innovative income-sharing platform. This unprecedented response demonstrates the global appetite for Formula 1 investment opportunities and the power of Keeps\' democratized approach to sports finance.',
      'The income-sharing agreement offers investors a 10% stake in McLaren\'s future sponsorship revenues over five years, with minimum investments starting at just £1,000. This structure allows fans worldwide to participate in Formula 1\'s commercial success while supporting their favourite team\'s competitive ambitions.',
      '"Investing in McLaren via Keeps feels like being part of the pit crew! The returns are thrilling and I love supporting the team\'s innovation," explains Sarah Chen, an early investor from Singapore who participated in the record-breaking fundraise.',
      'Keeps\' regenerative model ensures that investor returns are reinvested into McLaren\'s technological development and racing infrastructure. This creates a virtuous cycle where fan investment directly contributes to on-track performance, potentially generating even greater returns through improved commercial partnerships and prize money.'
    ]
  },
  {
    id: '3',
    title: 'Ryder Cup Debenture Program Nearly Sold Out',
    summary: 'The exclusive Ryder Cup debenture program is 90% subscribed, with only 260 debentures remaining for the upcoming tournament.',
    date: '2025-06-28',
    source: 'Golf Digest',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=400&fit=crop&crop=center',
    url: '#',
    content: [
      'The Ryder Cup debenture programme has achieved remarkable success through Keeps Sport, with 90% of the 2,600 available debentures now sold to golf enthusiasts and investors worldwide. This exclusive programme offers unprecedented access to one of golf\'s most prestigious events while providing attractive financial returns.',
      'Debenture holders receive 5% annual interest plus 40% of their principal investment returned, creating an attractive investment proposition combined with unparalleled tournament access. The tiered structure ensures benefits for every investment level, from Bronze commemorative merchandise to Diamond tier Captain\'s Dinners.',
      '"The Ryder Cup debenture programme through Keeps has been incredible - the access and returns exceed all expectations. Meeting the players and experiencing the tournament from inside is priceless," shares Michael Rodriguez, a Platinum tier debenture holder.',
      'Keeps\' regenerative approach ensures that debenture proceeds directly support tournament infrastructure and player development programmes. This model creates lasting value for the sport while providing investors with both financial returns and unforgettable experiences at golf\'s most exciting team competition.'
    ]
  },
  {
    id: '4',
    title: 'Ohio State Prepares for Upcoming Stadium Investment Launch',
    summary: 'Ohio State University announces plans to launch a £80,000,000 stadium renovation investment opportunity through Keeps Sport in Q4 2025.',
    date: '2025-06-22',
    source: 'ESPN',
    imageUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=400&fit=crop&crop=center',
    url: '#',
    content: [
      'Ohio State University has announced its partnership with Keeps Sport to prepare for an ambitious £80,000,000 stadium renovation investment opportunity, set to launch in Q4 2025. This groundbreaking initiative will mark the first time a major American university offers direct fan investment opportunities for infrastructure development.',
      'The upcoming campaign will offer fans the opportunity to invest in the iconic Ohio Stadium\'s modernization, with projected 8% annual dividends from increased stadium revenues including premium seating, hospitality, and naming rights. Minimum investments are expected to start at £2,500, making this accessible to Buckeye fans worldwide.',
      '"We\'re excited about the potential to involve our global fanbase in Ohio State\'s future. This innovative approach will allow supporters to be part of our stadium\'s transformation," explains David Park, Ohio State\'s Director of Strategic Partnerships.',
      'Keeps\' regenerative model will ensure that stadium revenue growth directly benefits both investors and the university\'s athletic programmes. This approach creates a sustainable funding mechanism for college sports infrastructure while providing fans with meaningful ownership in their team\'s future success.'
    ]
  },
  {
    id: '5',
    title: 'Cardiff City Announces Upcoming Fan Investment Opportunity',
    summary: 'Championship side Cardiff City reveals plans for a £4,000,000 equity fundraising round through Keeps Sport, launching early 2026.',
    date: '2025-06-15',
    source: 'BBC Sport',
    imageUrl: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=800&h=400&fit=crop&crop=center',
    url: '#',
    content: [
      'Cardiff City FC has announced plans for a revolutionary £4,000,000 equity fundraising round through Keeps Sport, set to launch in early 2026. The initiative will offer fans a genuine 10% ownership stake in the Championship club, representing a new model for football club financing that puts supporters at the heart of ownership decisions.',
      'The upcoming equity offering will allow fans to invest from £1,000, with projected 12% annual dividends from club profits and commercial growth. This democratized approach to football ownership will give Cardiff supporters a real voice in the club\'s strategic direction and future development.',
      '"We\'re thrilled about the opportunity to involve our passionate fanbase in Cardiff City\'s ownership structure. This will strengthen the bond between club and supporters like never before," shares Vincent Tan, Cardiff City Chairman.',
      'Keeps\' regenerative finance model will ensure that investor dividends are reinvested into player development, stadium improvements, and community programmes. This approach creates a sustainable growth cycle that benefits the club, its supporters, and the broader Cardiff community while providing attractive returns to investor-fans.'
    ]
  },
  {
    id: '6',
    title: 'Sports Investment Platforms See Record User Growth',
    summary: 'Digital platforms facilitating fan investment in sports properties report unprecedented user acquisition in 2025.',
    date: '2025-05-20',
    source: 'TechCrunch',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center',
    url: '#',
    content: [
      'The sports investment sector has experienced explosive growth in 2025, with platforms like Keeps Sport leading the charge in democratizing access to sports assets. User acquisition has increased by over 300% as fans worldwide discover opportunities to invest in their favorite teams and athletes.',
      'This growth reflects a fundamental shift in how sports are financed, moving away from traditional institutional investment toward fan-powered funding models. Keeps Sport\'s innovative approach has made it possible for ordinary supporters to become stakeholders in professional sports organizations.',
      '"The transparency and accessibility of platforms like Keeps has opened up a whole new world of investment opportunities. Sports fans are natural investors in what they\'re passionate about," notes Lisa Wang, a financial technology analyst.',
      'The regenerative finance model pioneered by Keeps ensures that fan investment creates sustainable value for sports organisations while providing attractive returns. This approach is reshaping the sports industry by aligning fan passion with financial opportunity, creating stronger connections between supporters and their teams.'
    ]
  },
  {
    id: '7',
    title: 'Hexagon Fan Team Prepares for Revolutionary Fan Investment Model',
    summary: 'Digital sports entertainment collective Hexagon Fan Team announces plans for innovative fan ownership structure launching in 2026.',
    date: '2025-05-15',
    source: 'Sports Tech Weekly',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop&crop=center',
    url: '#',
    content: [
      'Hexagon Fan Team, the rapidly growing digital sports entertainment collective, has announced plans for a groundbreaking fan investment opportunity through Keeps Sport, set to launch in 2026. This innovative model will allow fans to directly invest in content creation and fan engagement activities.',
      'The upcoming investment round will offer fans the opportunity to become stakeholders in the digital sports entertainment space, with projected returns from content monetization, brand partnerships, and fan engagement platforms. Minimum investments are expected to start at £500, making this accessible to digital sports fans globally.',
      '"We\'re pioneering a new model where fans become true partners in digital sports entertainment. This isn\'t just about watching content - it\'s about owning a piece of the future of fan engagement," explains Alex Chen, Hexagon Fan Team founder.',
      'Keeps\' regenerative approach will ensure that fan investment directly funds content creation, technology development, and community building initiatives. This model creates a sustainable ecosystem where fan passion translates into both entertainment value and financial returns, revolutionising how digital sports communities operate.'
    ]
  }
];