
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  StyleSheet, StatusBar, Linking, Alert
} from 'react-native';

const GOLD = '#D4AF37';
const BLACK = '#080808';
const CARD = '#171717';

const services = [
  { icon: '📸', name: 'Photography', desc: 'Professional portraits, events and lifestyle photography.' },
  { icon: '🎥', name: 'Videography', desc: 'Creative video production for events and brands.' },
  { icon: '🖼️', name: 'Photo Editing', desc: 'Professional retouching and colour correction.' },
  { icon: '🎬', name: 'Video Editing', desc: 'Cinematic edits, reels and promotional videos.' },
];

export default function App() {
  const [page, setPage] = useState('Home');
  const [name, setName] = useState('');
  const [service, setService] = useState('Photography');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');

  const navigate = (screen) => setPage(screen);

  const sendBooking = () => {
    if (!name.trim() || !date.trim()) {
      Alert.alert('Missing information', 'Please enter your name and preferred date.');
      return;
    }

    const message =
      `MYCO VISUALS STUDIO BOOKING\n\nName: ${name}\nService: ${service}\nDate: ${date}\nDetails: ${details}`;

    Linking.openURL(
      'https://wa.me/255794246753?text=' + encodeURIComponent(message)
    ).catch(() => Alert.alert('Error', 'Could not open WhatsApp.'));
  };

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.logo}>MYCO<Text style={{color:GOLD}}> VISUALS</Text></Text>
      <Text style={styles.headerSub}>STUDIO</Text>
    </View>
  );

  const GoldButton = ({ title, onPress }) => (
    <TouchableOpacity style={styles.goldButton} onPress={onPress}>
      <Text style={styles.goldButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const Home = () => (
    <>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>WELCOME TO MYCO VISUALS STUDIO</Text>
        <Text style={styles.heroTitle}>CAPTURE YOUR</Text>
        <Text style={styles.heroGold}>BEST MOMENTS.</Text>
        <Text style={styles.description}>
          We turn your special moments and creative ideas into beautiful
          photographs and cinematic videos.
        </Text>
        <GoldButton title="BOOK A SESSION  →" onPress={() => navigate('Booking')} />
        <TouchableOpacity onPress={() => navigate('Portfolio')}>
          <Text style={styles.outlineLink}>EXPLORE OUR WORK  ↗</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>WHAT WE DO</Text>
      {services.map((item) => (
        <View style={styles.serviceCard} key={item.name}>
          <Text style={styles.serviceIcon}>{item.icon}</Text>
          <View style={{flex:1}}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.desc}</Text>
          </View>
        </View>
      ))}
      <GoldButton title="VIEW ALL SERVICES" onPress={() => navigate('Services')} />
    </>
  );

  const Services = () => (
    <>
      <Text style={styles.pageTitle}>OUR SERVICES</Text>
      <Text style={styles.description}>Creative solutions for every moment.</Text>
      {services.map((item) => (
        <View style={styles.serviceCard} key={item.name}>
          <Text style={styles.serviceIcon}>{item.icon}</Text>
          <View style={{flex:1}}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.desc}</Text>
          </View>
        </View>
      ))}
      <GoldButton title="BOOK OUR SERVICES" onPress={() => navigate('Booking')} />
    </>
  );

  const Portfolio = () => (
    <>
      <Text style={styles.pageTitle}>OUR PORTFOLIO</Text>
      <Text style={styles.description}>
        A selection of creative work from MYCO VISUALS STUDIO.
      </Text>
      {[
        ['📷', 'Photography', 'Portraits • Events • Lifestyle'],
        ['🎞️', 'Videography', 'Events • Commercial • Creative'],
        ['✨', 'Photo Editing', 'Retouching • Colour grading'],
        ['🎬', 'Video Editing', 'Cinematic • Reels • Promotions'],
      ].map((item) => (
        <View style={styles.portfolioCard} key={item[1]}>
          <Text style={styles.portfolioIcon}>{item[0]}</Text>
          <Text style={styles.cardTitle}>{item[1]}</Text>
          <Text style={styles.cardDescription}>{item[2]}</Text>
          <Text style={styles.comingSoon}>PORTFOLIO SHOWCASE</Text>
        </View>
      ))}
      <Text style={styles.smallNote}>
        Photography and video samples will be added to this gallery soon.
      </Text>
    </>
  );

  const Booking = () => (
    <>
      <Text style={styles.pageTitle}>BOOK A SESSION</Text>
      <Text style={styles.description}>
        Tell us about your project. We will contact you on WhatsApp.
      </Text>

      <Text style={styles.fieldLabel}>YOUR NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.fieldLabel}>SELECT SERVICE</Text>
      {services.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[styles.option, service === item.name && styles.optionActive]}
          onPress={() => setService(item.name)}
        >
          <Text style={styles.optionText}>
            {service === item.name ? '●  ' : '○  '}{item.name}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.fieldLabel}>PREFERRED DATE</Text>
      <TextInput
        style={styles.input}
        placeholder="Example: 25 December 2026"
        placeholderTextColor="#777"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.fieldLabel}>PROJECT DETAILS</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Tell us more about your project..."
        placeholderTextColor="#777"
        multiline
        value={details}
        onChangeText={setDetails}
      />

      <GoldButton title="SEND BOOKING ON WHATSAPP  →" onPress={sendBooking} />
    </>
  );

  const Contact = () => (
    <>
      <Text style={styles.pageTitle}>GET IN TOUCH</Text>
      <Text style={styles.description}>
        Have a project in mind? Let's create something amazing together.
      </Text>
      <View style={styles.contactCard}>
        <Text style={styles.serviceIcon}>💬</Text>
        <Text style={styles.cardTitle}>WHATSAPP</Text>
        <Text style={styles.cardDescription}>+255 794 246 753</Text>
        <GoldButton
          title="CHAT WITH US"
          onPress={() => Linking.openURL('https://wa.me/255794246753')}
        />
      </View>
      <View style={styles.contactCard}>
        <Text style={styles.serviceIcon}>📍</Text>
        <Text style={styles.cardTitle}>OUR STUDIO</Text>
        <Text style={styles.cardDescription}>Tanzania</Text>
      </View>
    </>
  );

  const About = () => (
    <>
      <Text style={styles.pageTitle}>ABOUT MYCO</Text>
      <View style={styles.aboutCard}>
        <Text style={styles.aboutLogo}>MYCO VISUALS</Text>
        <Text style={styles.aboutSubtitle}>STUDIO</Text>
        <Text style={styles.description}>
          MYCO VISUALS STUDIO is a creative photography and videography brand
          dedicated to capturing moments, telling stories and bringing ideas
          to life through visual creativity.
        </Text>
        <Text style={styles.goldHeading}>OUR MISSION</Text>
        <Text style={styles.cardDescription}>
          To deliver creative, memorable and professional visual experiences.
        </Text>
        <Text style={styles.goldHeading}>OUR SERVICES</Text>
        <Text style={styles.cardDescription}>
          Photography • Videography • Photo Editing • Video Editing
        </Text>
      </View>
    </>
  );

  const renderPage = () => {
    switch (page) {
      case 'Services': return <Services />;
      case 'Portfolio': return <Portfolio />;
      case 'Booking': return <Booking />;
      case 'Contact': return <Contact />;
      case 'About': return <About />;
      default: return <Home />;
    }
  };

  const navItems = ['Home', 'Services', 'Portfolio', 'Booking', 'Contact', 'About'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BLACK} />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {renderPage()}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>MYCO VISUALS STUDIO</Text>
          <Text style={styles.footerText}>CREATIVITY • QUALITY • EXCELLENCE</Text>
          <Text style={styles.footerText}>© 2026 MYCO VISUALS STUDIO</Text>
        </View>
      </ScrollView>
      <View style={styles.nav}>
        {navItems.map((item) => (
          <TouchableOpacity key={item} onPress={() => navigate(item)} style={styles.navItem}>
            <Text style={[styles.navText, page === item && styles.navActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:BLACK },
  header: {
    paddingTop:14, paddingBottom:12, alignItems:'center',
    borderBottomWidth:1, borderBottomColor:'#39301B',
  },
  logo: { color:'#FFFFFF', fontSize:23, fontWeight:'900', letterSpacing:2 },
  headerSub: { color:GOLD, fontSize:10, letterSpacing:5, marginTop:2 },
  content: { padding:20, paddingBottom:35 },
  hero: {
    minHeight:390, justifyContent:'center', paddingVertical:35,
    borderBottomWidth:1, borderBottomColor:'#40351D',
  },
  eyebrow: { color:GOLD, fontSize:10, letterSpacing:2, marginBottom:20 },
  heroTitle: { color:'#FFFFFF', fontSize:34, fontWeight:'900', letterSpacing:1 },
  heroGold: { color:GOLD, fontSize:34, fontWeight:'900', letterSpacing:1 },
  description: { color:'#BBBBBB', fontSize:14, lineHeight:23, marginTop:15, marginBottom:22 },
  goldButton: {
    backgroundColor:GOLD, padding:16, alignItems:'center',
    borderRadius:5, marginTop:12, marginBottom:12,
  },
  goldButtonText: { color:'#080808', fontSize:12, fontWeight:'900', letterSpacing:1 },
  outlineLink: { color:GOLD, textAlign:'center', marginTop:15, fontSize:12, letterSpacing:1 },
  sectionTitle: { color:GOLD, fontSize:18, fontWeight:'900', marginTop:28, marginBottom:15 },
  pageTitle: { color:GOLD, fontSize:27, fontWeight:'900', marginTop:18, letterSpacing:1 },
  serviceCard: {
    backgroundColor:CARD, borderWidth:1, borderColor:'#302817',
    borderRadius:8, padding:16, marginBottom:12, flexDirection:'row',
    alignItems:'center', gap:14,
  },
  serviceIcon: { fontSize:30, marginRight:5 },
  cardTitle: { color:'#FFFFFF', fontSize:15, fontWeight:'800', marginBottom:6 },
  cardDescription: { color:'#AAAAAA', fontSize:12, lineHeight:19 },
  portfolioCard: {
    backgroundColor:CARD, borderRadius:8, borderWidth:1,
    borderColor:'#302817', padding:22, marginBottom:14,
  },
  portfolioIcon: { fontSize:36, marginBottom:12 },
  comingSoon: { color:GOLD, fontSize:10, letterSpacing:2, marginTop:15 },
  smallNote: { color:'#999999', fontSize:11, lineHeight:18, marginTop:8 },
  fieldLabel: { color:GOLD, fontSize:11, fontWeight:'800', letterSpacing:1, marginTop:20, marginBottom:8 },
  input: {
    backgroundColor:CARD, color:'#FFFFFF', borderWidth:1,
    borderColor:'#514322', borderRadius:5, padding:14, fontSize:14,
  },
  textArea: { height:110, textAlignVertical:'top' },
  option: {
    backgroundColor:CARD, borderColor:'#393939', borderWidth:1,
    padding:13, borderRadius:5, marginBottom:7,
  },
  optionActive: { borderColor:GOLD },
  optionText: { color:'#FFFFFF', fontSize:13 },
  contactCard: {
    backgroundColor:CARD, borderColor:'#40351D', borderWidth:1,
    borderRadius:8, padding:22, marginTop:15, alignItems:'center',
  },
  aboutCard: {
    backgroundColor:CARD, padding:22, borderRadius:8,
    borderWidth:1, borderColor:'#40351D', marginTop:20,
  },
  aboutLogo: { color:'#FFFFFF', fontSize:25, fontWeight:'900', textAlign:'center' },
  aboutSubtitle: { color:GOLD, textAlign:'center', letterSpacing:5, marginTop:5 },
  goldHeading: { color:GOLD, fontWeight:'900', fontSize:13, marginTop:20, marginBottom:8 },
  footer: { borderTopWidth:1, borderTopColor:'#39301B', marginTop:35, paddingTop:22, alignItems:'center' },
  footerLogo: { color:GOLD, fontSize:13, fontWeight:'900', letterSpacing:2 },
  footerText: { color:'#777777', fontSize:9, letterSpacing:1, marginTop:9 },
  nav: {
    flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around',
    backgroundColor:'#111111', borderTopWidth:1, borderTopColor:'#493B1E',
    paddingVertical:9,
  },
  navItem: { paddingHorizontal:7, paddingVertical:7 },
  navText: { color:'#999999', fontSize:10, fontWeight:'700' },
  navActive: { color:GOLD },
});
