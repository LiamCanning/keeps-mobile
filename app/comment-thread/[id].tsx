import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Reply {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

const commentThreads: { [key: string]: Reply[] } = {
  '1': [
    {
      id: 'r1',
      username: 'Tom Wilson',
      handle: '@tomwilson_lfc',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      content: 'Completely agree! The stadium tour was incredible. Being able to walk through the players\' tunnel knowing I\'m actually an investor made it so much more special.',
      timestamp: '1h',
      likes: 8,
    },
    {
      id: 'r2',
      username: 'Katie Brown',
      handle: '@katieb_investor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      content: 'How long did it take for your investment to process? I\'m thinking of getting in before the next tier threshold.',
      timestamp: '45m',
      likes: 3,
    },
    {
      id: 'r3',
      username: 'James Mitchell',
      handle: '@jamesmitch_nyc',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: '@katieb_investor It was pretty quick! About 24 hours and I had my investor dashboard set up. The benefits kicked in immediately.',
      timestamp: '30m',
      likes: 5,
    },
  ],
  '2': [
    {
      id: 'r4',
      username: 'Mark Stevens',
      handle: '@markstevens_f1',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: 'The McLaren opportunity is genius! Finally a way for F1 fans to actually benefit from the sport\'s growth. The sponsorship revenue sharing model is brilliant.',
      timestamp: '3h',
      likes: 12,
    },
    {
      id: 'r5',
      username: 'Anna Rodriguez',
      handle: '@annarodriguez_racing',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: 'I love how transparent Keeps is about everything. You can see exactly where your money goes and how the returns are calculated.',
      timestamp: '2h',
      likes: 7,
    },
    {
      id: 'r6',
      username: 'David Kim',
      handle: '@davidkim_racing',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'Love how Keeps makes sports investment accessible to everyone. The benefits and returns are incredible!',
      timestamp: '1h',
      likes: 9,
    },
    {
      id: 'r7',
      username: 'Emma Wilson',
      handle: '@emmawilson_f1',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'The exclusive access and experiences you get through Keeps are unmatched. This is the future of fan engagement!',
      timestamp: '45m',
      likes: 15,
    },
    {
      id: 'r8',
      username: 'James Parker',
      handle: '@jamesparker_investor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'Finally, regular fans can invest in the teams they love. The democratization of sports investment is revolutionary.',
      timestamp: '30m',
      likes: 11,
    },
    {
      id: 'r9',
      username: 'Lisa Thompson',
      handle: '@lisathompson_sports',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      content: 'The returns and benefits make this so much more than just being a fan. You\'re actually part of the team\'s success!',
      timestamp: '15m',
      likes: 8,
    },
  ],
  '3': [
    {
      id: 'r10',
      username: 'Golf Pro Mike',
      handle: '@golfpromike',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
      content: 'The Ryder Cup debentures are incredible value. The access you get is unmatched - I\'ve been to corporate events before but this is on another level.',
      timestamp: '4h',
      likes: 15,
    },
    {
      id: 'r11',
      username: 'Jennifer Walsh',
      handle: '@jennwalsh_golf',
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop&crop=face',
      content: 'The tiered system is so well thought out. Even at Bronze level, the merchandise and access feels premium. Can\'t wait to upgrade!',
      timestamp: '3h',
      likes: 9,
    },
    {
      id: 'r12',
      username: 'Robert Johnson',
      handle: '@robertj_golf',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      content: 'Being part of the Ryder Cup through Keeps gives you access to experiences money can\'t usually buy. The behind-the-scenes access is amazing!',
      timestamp: '2h',
      likes: 12,
    },
    {
      id: 'r13',
      username: 'Michelle Davis',
      handle: '@michelledavis_golf',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      content: 'The investment returns combined with exclusive tournament access make this a no-brainer for any golf fan.',
      timestamp: '1h',
      likes: 7,
    },
    {
      id: 'r14',
      username: 'Steve Wilson',
      handle: '@stevewilson_sports',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
      content: 'Keeps has revolutionized how fans can engage with their favorite sports. The debenture programme is brilliant!',
      timestamp: '30m',
      likes: 10,
    },
  ],
  '4': [
    {
      id: 'r15',
      username: 'Tom Anderson',
      handle: '@tomanderson_fan',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      content: 'Exactly! Keeps has made sports investment accessible to everyone, not just the wealthy. The minimum entry points are perfect for regular fans.',
      timestamp: '7h',
      likes: 18,
    },
    {
      id: 'r16',
      username: 'Rachel Green',
      handle: '@rachelgreen_sports',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      content: 'The tiered benefits system is genius. Even at the lowest tier, you get amazing perks that make you feel like a VIP.',
      timestamp: '6h',
      likes: 14,
    },
    {
      id: 'r17',
      username: 'Mike Johnson',
      handle: '@mikejohnson_investor',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: 'I love how transparent the returns are. You know exactly what you\'re getting into and the potential upside is incredible.',
      timestamp: '5h',
      likes: 22,
    },
    {
      id: 'r18',
      username: 'Sophie Martinez',
      handle: '@sophiem_fan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'The exclusive content and behind-the-scenes access you get is worth the investment alone. The returns are just a bonus!',
      timestamp: '4h',
      likes: 16,
    },
    {
      id: 'r19',
      username: 'Alex Thompson',
      handle: '@alexthompson_sports',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'This is revolutionary. Finally, fans can have a real stake in their favorite teams and benefit from their success.',
      timestamp: '3h',
      likes: 19,
    },
    {
      id: 'r20',
      username: 'Jessica Wilson',
      handle: '@jessicaw_investor',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      content: 'The community aspect is amazing too. You\'re not just investing, you\'re joining a community of passionate fans.',
      timestamp: '2h',
      likes: 13,
    },
    {
      id: 'r21',
      username: 'Daniel Brown',
      handle: '@danielbrown_fan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      content: 'The regenerative finance model is brilliant. Your investment helps grow the sport while giving you returns.',
      timestamp: '1h',
      likes: 21,
    },
    {
      id: 'r22',
      username: 'Laura Davis',
      handle: '@lauradavis_sports',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      content: 'I\'ve been waiting for something like this for years. Finally, a way to truly support your team and benefit from it.',
      timestamp: '45m',
      likes: 17,
    },
    {
      id: 'r23',
      username: 'Chris Miller',
      handle: '@chrismiller_investor',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
      content: 'The exclusive events and meet-and-greets are incredible. You get access to experiences money usually can\'t buy.',
      timestamp: '30m',
      likes: 15,
    },
    {
      id: 'r24',
      username: 'Amanda Rodriguez',
      handle: '@amandar_fan',
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop&crop=face',
      content: 'This is the future of sports fandom. Being an investor makes you feel so much more connected to the team.',
      timestamp: '15m',
      likes: 12,
    },
    {
      id: 'r25',
      username: 'Kevin Park',
      handle: '@kevinpark_sports',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'The returns combined with the exclusive access make this a win-win. You support your team and get rewarded for it.',
      timestamp: '5m',
      likes: 20,
    },
    {
      id: 'r26',
      username: 'Nicole White',
      handle: '@nicolew_investor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: 'Keeps has changed how I think about being a fan. Now I\'m not just cheering from the sidelines, I\'m actually invested in the success.',
      timestamp: '2m',
      likes: 18,
    },
  ],
  '5': [
    {
      id: 'r27',
      username: 'Mark Wilson',
      handle: '@markwilson_cardiff',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      content: 'Cardiff City through Keeps is going to be amazing! 10% ownership gives fans a real voice in how the club is run.',
      timestamp: '9h',
      likes: 25,
    },
    {
      id: 'r28',
      username: 'Sarah Johnson',
      handle: '@sarahj_cardiff',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      content: 'This is what football ownership should be - by the fans, for the fans. Can\'t wait for this to launch!',
      timestamp: '8h',
      likes: 19,
    },
    {
      id: 'r29',
      username: 'James Taylor',
      handle: '@jamestaylor_fan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: 'The potential 12% annual dividends from club profits is incredible. This could be a game-changer for Cardiff.',
      timestamp: '7h',
      likes: 22,
    },
    {
      id: 'r30',
      username: 'Emma Davis',
      handle: '@emmadavis_cardiff',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'Finally, a way for Cardiff fans to have a real stake in the club\'s future. This is revolutionary for Welsh football.',
      timestamp: '6h',
      likes: 17,
    },
    {
      id: 'r31',
      username: 'Ryan Thomas',
      handle: '@ryanthomas_cardiff',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'The £1,000 minimum entry makes this accessible to so many fans. Keeps is democratizing football ownership!',
      timestamp: '5h',
      likes: 21,
    },
    {
      id: 'r32',
      username: 'Lisa Evans',
      handle: '@lisaevans_fan',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      content: 'This could transform Cardiff City. Having fan ownership through Keeps means the club will truly represent its supporters.',
      timestamp: '4h',
      likes: 16,
    },
    {
      id: 'r33',
      username: 'Michael Brown',
      handle: '@michaelbrown_cardiff',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      content: 'The transparency and fan involvement that Keeps brings is exactly what football needs. Can\'t wait to invest!',
      timestamp: '3h',
      likes: 18,
    },
    {
      id: 'r34',
      username: 'Katie Williams',
      handle: '@katiew_cardiff',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      content: 'Being able to invest in Cardiff through Keeps means I\'ll have a real say in the club\'s direction. This is the future!',
      timestamp: '2h',
      likes: 14,
    },
  ],
  '6': [
    {
      id: 'r35',
      username: 'Peter Johnson',
      handle: '@peterjohnson_finance',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      content: 'The regenerative finance model is exactly what sports needed. Your investment actually helps grow the sport while giving you returns.',
      timestamp: '11h',
      likes: 16,
    },
    {
      id: 'r36',
      username: 'Rachel Kim',
      handle: '@rachelkim_investor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      content: 'This is revolutionary! Finally fans can benefit from the success of their favorite teams instead of just watching from the sidelines.',
      timestamp: '10h',
      likes: 12,
    },
    {
      id: 'r37',
      username: 'Alex Chen',
      handle: '@alexchen_sports',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: 'The transparency in how investments are used and returns are calculated is incredible. Keeps sets the standard for ethical sports investment.',
      timestamp: '9h',
      likes: 18,
    },
    {
      id: 'r38',
      username: 'Maria Santos',
      handle: '@mariasantos_fan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'Love how this creates a community of investors who are all passionate about sports. It\'s not just about money, it\'s about being part of something bigger.',
      timestamp: '8h',
      likes: 14,
    },
    {
      id: 'r39',
      username: 'James Wilson',
      handle: '@jameswilson_investor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'The minimum investment amounts make this accessible to so many people. Democratizing sports investment is brilliant!',
      timestamp: '7h',
      likes: 20,
    },
    {
      id: 'r40',
      username: 'Sophie Davis',
      handle: '@sophiedavis_sports',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      content: 'This model could transform how sports are funded globally. Fans having a real stake in their teams\' success is the future.',
      timestamp: '6h',
      likes: 15,
    },
    {
      id: 'r41',
      username: 'Michael Brown',
      handle: '@michaelbrown_finance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      content: 'The returns combined with the exclusive experiences make this a no-brainer for any sports fan looking to invest.',
      timestamp: '5h',
      likes: 11,
    },
    {
      id: 'r42',
      username: 'Emma Rodriguez',
      handle: '@emmarodriguez_investor',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      content: 'Being able to contribute to the growth of sports while getting financial returns feels amazing. This is investing with purpose.',
      timestamp: '4h',
      likes: 13,
    },
    {
      id: 'r43',
      username: 'David Thompson',
      handle: '@davidthompson_sports',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
      content: 'Keeps has created something special here. The community aspect combined with real financial benefits is incredible.',
      timestamp: '3h',
      likes: 17,
    },
  ],
  '7': [
    {
      id: 'r44',
      username: 'Tom Martinez',
      handle: '@tommartinez_fan',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      content: 'The exclusive experiences are worth the investment alone! Meeting players and getting behind-the-scenes access is incredible.',
      timestamp: '13h',
      likes: 8,
    },
    {
      id: 'r45',
      username: 'Lisa Johnson',
      handle: '@lisajohnson_sports',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      content: 'This is what I\'ve been waiting for! Finally a way to be more than just a spectator and actually benefit from my team\'s success.',
      timestamp: '12h',
      likes: 12,
    },
    {
      id: 'r46',
      username: 'Ryan Davis',
      handle: '@ryandavis_investor',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: 'The VIP treatment and exclusive access make you feel like you\'re part of the inner circle. Amazing experience!',
      timestamp: '11h',
      likes: 15,
    },
    {
      id: 'r47',
      username: 'Sarah Wilson',
      handle: '@sarahwilson_fan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'Being able to meet players and get exclusive content makes this investment so much more meaningful than traditional investments.',
      timestamp: '10h',
      likes: 9,
    },
  ],
  '8': [
    {
      id: 'r48',
      username: 'Mark Thompson',
      handle: '@markthompson_sports',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      content: 'The tiered system is brilliant! Even at Bronze level, you get amazing benefits that make you feel special.',
      timestamp: '15h',
      likes: 11,
    },
    {
      id: 'r49',
      username: 'Jennifer Brown',
      handle: '@jenniferbrown_investor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      content: 'The exclusive content and merchandise you get at each tier is incredible. The returns are just a bonus!',
      timestamp: '14h',
      likes: 8,
    },
    {
      id: 'r50',
      username: 'Alex Rodriguez',
      handle: '@alexrodriguez_fan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: 'Love how the benefits scale with your investment level. It really makes you want to invest more to unlock the next tier!',
      timestamp: '13h',
      likes: 14,
    },
    {
      id: 'r51',
      username: 'Katie Davis',
      handle: '@katiedavis_sports',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'The VIP experiences at each tier make you feel like royalty. This is how sports investment should be done!',
      timestamp: '12h',
      likes: 16,
    },
    {
      id: 'r52',
      username: 'Daniel Wilson',
      handle: '@danielwilson_investor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'The cherry on top is definitely the financial returns, but the experiences and access are what make this truly special.',
      timestamp: '11h',
      likes: 12,
    },
    {
      id: 'r53',
      username: 'Michelle Johnson',
      handle: '@michellejohnson_fan',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      content: 'Being treated like a VIP at every level is incredible. Keeps really knows how to make investors feel valued.',
      timestamp: '10h',
      likes: 10,
    },
  ],
  '9': [
    {
      id: 'r54',
      username: 'Chris Anderson',
      handle: '@chrisanderson_f1',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      content: 'Meeting the McLaren team was a dream come true! The access you get through Keeps is absolutely incredible.',
      timestamp: '17h',
      likes: 25,
    },
    {
      id: 'r55',
      username: 'Amanda Wilson',
      handle: '@amandawilson_racing',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      content: 'The behind-the-scenes access is unreal! Being in the pit lane during practice sessions was amazing.',
      timestamp: '16h',
      likes: 22,
    },
    {
      id: 'r56',
      username: 'Steve Martinez',
      handle: '@stevemartinez_f1',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: 'These are once-in-a-lifetime experiences that money usually can\'t buy. Keeps has opened doors I never thought possible.',
      timestamp: '15h',
      likes: 28,
    },
    {
      id: 'r57',
      username: 'Laura Thompson',
      handle: '@laurathompson_racing',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'Meeting the drivers and seeing the cars up close was incredible. The access through Keeps is unmatched!',
      timestamp: '14h',
      likes: 20,
    },
    {
      id: 'r58',
      username: 'Kevin Brown',
      handle: '@kevinbrown_f1',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'The exclusive McLaren events are phenomenal. You really feel like part of the team family.',
      timestamp: '13h',
      likes: 18,
    },
    {
      id: 'r59',
      username: 'Nicole Davis',
      handle: '@nicoledavis_racing',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      content: 'The hospitality and treatment you receive as a Keeps investor is first-class. Absolutely incredible experience!',
      timestamp: '12h',
      likes: 24,
    },
    {
      id: 'r60',
      username: 'James Rodriguez',
      handle: '@jamesrodriguez_f1',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      content: 'Being able to watch practice sessions from the McLaren garage was surreal. These experiences are priceless!',
      timestamp: '11h',
      likes: 26,
    },
    {
      id: 'r61',
      username: 'Emma Martinez',
      handle: '@emmamartinez_racing',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      content: 'The access to team briefings and strategy sessions is incredible. You really feel like an insider!',
      timestamp: '10h',
      likes: 21,
    },
    {
      id: 'r62',
      username: 'David Johnson',
      handle: '@davidjohnson_f1',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
      content: 'Meeting Lando and Oscar was amazing! The drivers are so approachable and genuine. What an experience!',
      timestamp: '9h',
      likes: 30,
    },
    {
      id: 'r63',
      username: 'Sarah Brown',
      handle: '@sarahbrown_racing',
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop&crop=face',
      content: 'The exclusive merchandise and signed memorabilia you get is incredible. These are memories that will last forever!',
      timestamp: '8h',
      likes: 19,
    },
    {
      id: 'r64',
      username: 'Michael Davis',
      handle: '@michaeldavis_f1',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      content: 'The VIP treatment at every McLaren event is phenomenal. You really feel like part of the McLaren family!',
      timestamp: '7h',
      likes: 23,
    },
    {
      id: 'r65',
      username: 'Lisa Rodriguez',
      handle: '@lisarodriguez_racing',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      content: 'Being invited to the McLaren Technology Centre was incredible. The innovation and technology is mind-blowing!',
      timestamp: '6h',
      likes: 27,
    },
    {
      id: 'r66',
      username: 'Tom Wilson',
      handle: '@tomwilson_f1',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: 'The access to race weekends and exclusive events makes this investment so much more than just financial returns.',
      timestamp: '5h',
      likes: 25,
    },
    {
      id: 'r67',
      username: 'Jennifer Martinez',
      handle: '@jennifermartinez_f1',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'The hospitality suites and exclusive viewing areas give you the best seats in the house. Absolutely incredible!',
      timestamp: '4h',
      likes: 22,
    },
    {
      id: 'r68',
      username: 'Alex Thompson',
      handle: '@alexthompson_f1',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'These experiences have made me an even bigger McLaren fan. The access and treatment is world-class!',
      timestamp: '3h',
      likes: 20,
    },
  ],
  '10': [
    {
      id: 'r69',
      username: 'John Smith',
      handle: '@johnsmith_lfc',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      content: 'YNWA! Being a Liverpool investor through Keeps makes every match even more exciting. You really feel part of the club!',
      timestamp: '19h',
      likes: 18,
    },
    {
      id: 'r70',
      username: 'Katie Wilson',
      handle: '@katiewilson_liverpool',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      content: 'The exclusive stadium tours and access to Anfield are incredible. Being an investor gives you such special treatment!',
      timestamp: '18h',
      likes: 22,
    },
    {
      id: 'r71',
      username: 'Mark Davis',
      handle: '@markdavis_lfc',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      content: 'Walking through the players\' tunnel knowing I\'m actually an investor was surreal. This is what being a true Red means!',
      timestamp: '17h',
      likes: 25,
    },
    {
      id: 'r72',
      username: 'Sophie Johnson',
      handle: '@sophiejohnson_liverpool',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      content: 'The exclusive merchandise and signed memorabilia you get as an investor is amazing. YNWA forever!',
      timestamp: '16h',
      likes: 20,
    },
    {
      id: 'r73',
      username: 'Ryan Martinez',
      handle: '@ryanmartinez_lfc',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'Being part of Liverpool\'s future through Keeps is incredible. The returns and experiences make this perfect for any Red!',
      timestamp: '15h',
      likes: 19,
    },
    {
      id: 'r74',
      username: 'Emma Brown',
      handle: '@emmabrown_liverpool',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      content: 'The exclusive events and meet-and-greets with players are once-in-a-lifetime experiences. So grateful for Keeps!',
      timestamp: '14h',
      likes: 24,
    },
    {
      id: 'r75',
      username: 'James Thompson',
      handle: '@jamesthompson_lfc',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      content: 'Every match feels more meaningful when you know you\'re actually invested in the club\'s success. YNWA!',
      timestamp: '13h',
      likes: 21,
    },
    {
      id: 'r76',
      username: 'Laura Rodriguez',
      handle: '@laurarodriguez_lfc',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      content: 'The VIP treatment at Anfield and exclusive access to training sessions is incredible. This is the future of football fandom!',
      timestamp: '12h',
      likes: 23,
    },
    {
      id: 'r77',
      username: 'Daniel Martinez',
      handle: '@danielmartinez_lfc',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
      content: 'Being able to invest in Liverpool through Keeps and get exclusive benefits is a dream come true for any Red!',
      timestamp: '11h',
      likes: 26,
    },
    {
      id: 'r78',
      username: 'Michelle Wilson',
      handle: '@michellewilson_lfc',
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop&crop=face',
      content: 'The community of Liverpool investors through Keeps is amazing. We\'re all united in our love for the club and its future!',
      timestamp: '10h',
      likes: 17,
    },
    {
      id: 'r79',
      username: 'Chris Davis',
      handle: '@chrisdavis_lfc',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
      content: 'The returns combined with the exclusive Liverpool experiences make this the perfect investment for any fan. YNWA!',
      timestamp: '9h',
      likes: 22,
    },
  ],
};

const originalComments: { [key: string]: any } = {
  '1': {
    username: 'James Mitchell',
    handle: '@jamesmitch_nyc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Just invested in Liverpool FC through Keeps! The exclusive benefits and potential 4-8% returns make this feel like being a real part of the club. Never thought I\'d actually own shares in my favourite team!',
    timestamp: '2h',
    likes: 24,
  },
  '2': {
    username: 'Sarah Chen',
    handle: '@sarahc_investor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'The McLaren Racing ISA opportunity is incredible! Getting 10% of sponsorship revenues feels like being part of the team. This democratisation of sports investment is exactly what fans have been waiting for.',
    timestamp: '4h',
    likes: 18,
  },
  '3': {
    username: 'Michael Rodriguez',
    handle: '@mikerod_golf',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Secured my Ryder Cup debentures through Keeps! The exclusive tournament access and meet-and-greets with players make this so much more than just an investment. The returns are just a bonus!',
    timestamp: '6h',
    likes: 31,
  },
  '4': {
    username: 'Emma Thompson',
    handle: '@emmathompson_uk',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    content: 'Keeps has completely changed how I think about supporting my favorite teams. The exclusive access and real returns make you feel like you\'re truly part of the club\'s journey, not just a spectator.',
    timestamp: '8h',
    likes: 42,
  },
  '5': {
    username: 'David Park',
    handle: '@davidpark_sports',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    content: 'What I love about Keeps is how it gives regular fans access to investment opportunities that were previously only available to the ultra-wealthy. The benefits and returns are just incredible!',
    timestamp: '10h',
    likes: 27,
  },
  '6': {
    username: 'Lisa Wang',
    handle: '@lisawang_finance',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    content: 'The regenerative finance model is brilliant - your investment actually helps grow the sport while giving you amazing returns. It feels good knowing you\'re contributing to something bigger than just profit.',
    timestamp: '12h',
    likes: 35,
  },
  '7': {
    username: 'Alex Johnson',
    handle: '@alexj_investor',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
    content: 'The exclusive experiences you get through Keeps are unreal. Meeting players, behind-the-scenes access, VIP treatment - it\'s like being part of the inner circle of your favorite teams!',
    timestamp: '14h',
    likes: 19,
  },
  '8': {
    username: 'Sophie Martin',
    handle: '@sophiem_sports',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    content: 'The tiered benefits system is genius! Even at Bronze level, you get exclusive content and experiences that make you feel like a VIP. The returns are just the cherry on top!',
    timestamp: '16h',
    likes: 28,
  },
  '9': {
    username: 'Ryan O\'Connor',
    handle: '@ryanoconnor_f1',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    content: 'Just had an incredible experience meeting the McLaren team through my Keeps investment! The access you get is absolutely unreal - these are experiences money usually can\'t buy.',
    timestamp: '18h',
    likes: 67,
  },
  '10': {
    username: 'Maria Gonzalez',
    handle: '@mariag_liverpool',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    content: 'Being a Liverpool investor through Keeps has been incredible! The exclusive stadium access and knowing you\'re actually part of the club\'s future makes every match even more exciting. YNWA!',
    timestamp: '20h',
    likes: 45,
  },
};

export default function CommentThreadScreen() {
  const { id } = useLocalSearchParams();
  
  const originalComment = originalComments[id as string];
  const replies = commentThreads[id as string] || [];
  const replyCount = replies.length;
  
  if (!originalComment) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Comment not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "Conversation",
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Original Comment */}
        <View style={[styles.commentCard, styles.originalComment]}>
          <View style={styles.commentHeader}>
            <Image source={{ uri: originalComment.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.username}>{originalComment.username}</Text>
              <Text style={styles.handle}>{originalComment.handle}</Text>
            </View>
            <View style={styles.timestampContainer}>
              <Text style={styles.timestamp}>{originalComment.timestamp}</Text>
              <TouchableOpacity style={styles.moreButton}>
                <MoreHorizontal size={16} color={Colors.text.light} />
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={styles.commentContent}>{originalComment.content}</Text>
          
          <View style={styles.commentActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Heart size={18} color={Colors.text.light} />
              <Text style={styles.actionText}>{originalComment.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={18} color={Colors.text.light} />
              <Text style={styles.actionText}>{replies.length}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Share size={18} color={Colors.text.light} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Replies */}
        {replies.map((reply) => (
          <View key={reply.id} style={styles.replyCard}>
            <View style={styles.replyLine} />
            <View style={styles.commentHeader}>
              <Image source={{ uri: reply.avatar }} style={styles.avatarSmall} />
              <View style={styles.userInfo}>
                <Text style={styles.usernameSmall}>{reply.username}</Text>
                <Text style={styles.handleSmall}>{reply.handle}</Text>
              </View>
              <Text style={styles.timestampSmall}>{reply.timestamp}</Text>
            </View>
            
            <Text style={styles.replyContent}>{reply.content}</Text>
            
            <View style={styles.replyActions}>
              <TouchableOpacity style={styles.actionButtonSmall}>
                <Heart size={16} color={Colors.text.light} />
                <Text style={styles.actionTextSmall}>{reply.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButtonSmall}>
                <MessageCircle size={16} color={Colors.text.light} />
                <Text style={styles.actionTextSmall}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  commentCard: {
    backgroundColor: Colors.background.card,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  originalComment: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary.orange,
  },
  replyCard: {
    backgroundColor: Colors.background.card,
    marginHorizontal: 16,
    marginTop: 8,
    marginLeft: 32,
    borderRadius: 8,
    padding: 12,
    position: 'relative',
  },
  replyLine: {
    position: 'absolute',
    left: -16,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: Colors.border,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  usernameSmall: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  handle: {
    fontSize: 14,
    color: Colors.text.light,
  },
  handleSmall: {
    fontSize: 12,
    color: Colors.text.light,
  },
  timestampContainer: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: Colors.text.light,
    marginBottom: 4,
  },
  timestampSmall: {
    fontSize: 11,
    color: Colors.text.light,
  },
  moreButton: {
    padding: 4,
  },
  commentContent: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 22,
    marginBottom: 16,
  },
  replyContent: {
    fontSize: 14,
    color: Colors.text.dark,
    lineHeight: 20,
    marginBottom: 12,
    marginLeft: 44,
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  replyActions: {
    flexDirection: 'row',
    marginLeft: 44,
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  actionText: {
    fontSize: 14,
    color: Colors.text.light,
    marginLeft: 6,
  },
  actionTextSmall: {
    fontSize: 12,
    color: Colors.text.light,
    marginLeft: 4,
  },
  errorText: {
    color: Colors.text.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
});