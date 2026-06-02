// Configuration file for the Luxury Hotel & Menu website
const CONFIG = {
  // Replace this URL with your deployed Google Apps Script Web App URL
  // Example: "https://script.google.com/macros/s/AKfycbw.../exec"
  GOOGLE_SHEET_API_URL: "https://script.google.com/macros/s/AKfycbySqoorMPs33NX0cbzbhg-H1wvYZxtCCQMw-YLhBZU8zlmuKbv98vekRh_VyoOXb1p_/exec",

  // Default fallback password for local development or prior to Google Sheets connection
  DEFAULT_ADMIN_PASSWORD: "Admin@12",

  // Default luxury menu items loaded if Google Sheets API URL is not set or unreachable
  FALLBACK_MENU: [
    // --- VEG SOUP ---
    {
      id: "vs-1",
      name: "Veg Hot and Sour Soup",
      category: "Veg Soup",
      price: 72.00,
      description: "Classic spicy and sour soup loaded with finely chopped garden vegetables and aromatic herbs.",
      image: "",
      tags: "Veg, Spicy",
      available: true
    },
    {
      id: "vs-2",
      name: "Veg Sweet Corn Soup",
      category: "Veg Soup",
      price: 72.00,
      description: "Gentle and comforting cream-style corn soup filled with tender peas and carrots.",
      image: "",
      tags: "Veg, Mild",
      available: true
    },
    {
      id: "vs-3",
      name: "Veg Manchow Soup",
      category: "Veg Soup",
      price: 72.00,
      description: "Spicy garlic-infused Indo-Chinese soup topped with a generous handful of crispy fried noodles.",
      image: "",
      tags: "Veg, Hot",
      available: true
    },
    {
      id: "vs-4",
      name: "Veg Tomato Soup",
      category: "Veg Soup",
      price: 81.00,
      description: "Rich, velvety tomato soup prepared with vine-ripened tomatoes and finished with light butter croutons.",
      image: "",
      tags: "Veg, Classic",
      available: true
    },
    {
      id: "vs-5",
      name: "Lemon Coriander Soup",
      category: "Veg Soup",
      price: 72.00,
      description: "Clear vegetable stock brightened with zesty lemon juice and fresh fragrant coriander leaves.",
      image: "",
      tags: "Veg, Tangy, Healthy",
      available: true
    },

    // --- NON-VEG SOUP ---
    {
      id: "nvs-1",
      name: "Chicken Hot and Sour Soup",
      category: "Non-Veg Soup",
      price: 81.00,
      description: "A fiery and tangy soup loaded with shredded chicken breast, eggs, and bamboo shoots.",
      image: "",
      tags: "Non-Veg, Spicy",
      available: true
    },
    {
      id: "nvs-2",
      name: "Chicken Sweet Corn Soup",
      category: "Non-Veg Soup",
      price: 81.00,
      description: "Comforting, smooth chicken broth loaded with tender shredded chicken and sweet corn kernels.",
      image: "",
      tags: "Non-Veg, Mild",
      available: true
    },
    {
      id: "nvs-3",
      name: "Chicken Manchow Soup",
      category: "Non-Veg Soup",
      price: 81.00,
      description: "Spicy dark soy-based chicken soup flavored with garlic, ginger, and crispy fried noodles.",
      image: "",
      tags: "Non-Veg, Popular",
      available: true
    },

    // --- CHINESE MUSHROOM STARTER ---
    {
      id: "cms-1",
      name: "Mushroom Chilly",
      category: "Chinese Mushroom Starter",
      price: 181.00,
      description: "Batter-fried fresh button mushrooms tossed with green chilies, capsicum, and sweet-spicy dark soy.",
      image: "",
      tags: "Veg, Spicy",
      available: true
    },
    {
      id: "cms-2",
      name: "Mushroom 65",
      category: "Chinese Mushroom Starter",
      price: 181.00,
      description: "Crispy button mushrooms marinated in aromatic curd-spiced red marinade, deep-fried to perfection.",
      image: "",
      tags: "Veg, Crunchy",
      available: true
    },
    {
      id: "cms-3",
      name: "Mushroom Salt & Pepper",
      category: "Chinese Mushroom Starter",
      price: 181.00,
      description: "Lightly battered crispy mushrooms seasoned with crushed black peppercorns, garlic, and fresh scallions.",
      image: "",
      tags: "Veg, Signature",
      available: true
    },

    // --- CHINESE PANEER STARTER ---
    {
      id: "cps-1",
      name: "Apolo Paneer",
      category: "Chinese Paneer Starter",
      price: 191.00,
      description: "Stir-fried cottage cheese sticks seasoned with spicy yogurt sauce, green chilies, and aromatic curry leaves.",
      image: "",
      tags: "Veg, Signature",
      available: true
    },
    {
      id: "cps-2",
      name: "Paneer Manchurian",
      category: "Chinese Paneer Starter",
      price: 181.00,
      description: "Golden fried paneer cubes cooked in a savory, semi-dry ginger, garlic, and scallion gravy.",
      image: "",
      tags: "Veg, Indo-Chinese",
      available: true
    },
    {
      id: "cps-3",
      name: "Paneer Chilly",
      category: "Chinese Paneer Starter",
      price: 181.00,
      description: "Fresh paneer blocks stir-fried with hot green chilies, onions, and capsicum in spicy soy glaze.",
      image: "",
      tags: "Veg, Spicy",
      available: true
    },
    {
      id: "cps-4",
      name: "Paneer 65",
      category: "Chinese Paneer Starter",
      price: 181.00,
      description: "A spicy, deep-fried cottage cheese starter tossed with tempered red chilies and garlic yogurt glaze.",
      image: "",
      tags: "Veg, Spicy",
      available: true
    },
    {
      id: "cps-5",
      name: "Paneer Pakoda",
      category: "Chinese Paneer Starter",
      price: 181.00,
      description: "Soft cottage cheese slices stuffed with mint chutney, dipped in spiced gram flour batter and fried golden.",
      image: "",
      tags: "Veg, Traditional",
      available: true
    },

    // --- VEG STARTER ---
    {
      id: "vs-str-1",
      name: "Gobi Chilly",
      category: "Veg Starter",
      price: 148.00,
      description: "Crispy cauliflower florets stir-fried in a hot chili-garlic soy sauce with bell pepper slices.",
      image: "",
      tags: "Veg, Popular",
      available: true
    },
    {
      id: "vs-str-2",
      name: "Veg. Manchurian",
      category: "Veg Starter",
      price: 124.00,
      description: "Mixed vegetable dumplings fried and tossed in a thick ginger-soy sauce.",
      image: "",
      tags: "Veg, Classic",
      available: true
    },
    {
      id: "vs-str-3",
      name: "Paneer Tikka",
      category: "Veg Starter",
      price: 200.00,
      description: "Juicy, clay-oven grilled paneer cubes marinated in rich tikka yogurt spice blend.",
      image: "",
      tags: "Veg, Tandoori",
      available: true
    },

    // --- CHICKEN STARTER ---
    {
      id: "cs-1",
      name: "Chicken Pokoda",
      category: "Chicken Starter",
      price: 181.00,
      description: "Tender chicken bite-sized chunks marinated in local spices and deep-fried with a crispy gram flour coat.",
      image: "",
      tags: "Non-Veg, Crunchy",
      available: true
    },
    {
      id: "cs-2",
      name: "Chicken Lolly Pop",
      category: "Chicken Starter",
      price: 248.00,
      description: "Fleshy, juicy chicken drummettes fried crispy and served with a tangy schezwan dipping sauce.",
      image: "",
      tags: "Non-Veg, Popular",
      available: true
    },
    {
      id: "cs-3",
      name: "Chilly Chicken",
      category: "Chicken Starter",
      price: 210.00,
      description: "Diced chicken wok-tossed with fresh onions, capsicums, and hot green chilies in a spicy soy glaze.",
      image: "",
      tags: "Non-Veg, Spicy",
      available: true
    },
    {
      id: "cs-4",
      name: "Chicken Double Ekka",
      category: "Chicken Starter",
      price: 229.00,
      description: "Double-cooked crispy chicken blocks seasoned with special curry leaves and red chili fusion sauce.",
      image: "",
      tags: "Non-Veg, Chef's Special",
      available: true
    },
    {
      id: "cs-5",
      name: "Crispy Chicken",
      category: "Chicken Starter",
      price: 200.00,
      description: "Shredded golden-fried chicken strips tossed with light sweet chili and garlic sprinkles.",
      image: "",
      tags: "Non-Veg, Crunchy",
      available: true
    },
    {
      id: "cs-6",
      name: "Chicken Honey Garlic",
      category: "Chicken Starter",
      price: 200.00,
      description: "Sweet and savory starter consisting of crispy chicken chunks coated in honey-soy-garlic glaze.",
      image: "",
      tags: "Non-Veg, Sweet & Savory",
      available: true
    },
    {
      id: "cs-7",
      name: "Chicken Thai Pai",
      category: "Chicken Starter",
      price: 200.00,
      description: "Spiced wok-tossed chicken chunks prepared with ginger, lemongrass, and sweet Thai basil.",
      image: "",
      tags: "Non-Veg, Spicy",
      available: true
    },
    {
      id: "cs-8",
      name: "Chicken Sangarilla",
      category: "Chicken Starter",
      price: 200.00,
      description: "Unique fusion chicken recipe cooked in rich, slow-simmered aromatic spices and red sauce.",
      image: "",
      tags: "Non-Veg, Signature",
      available: true
    },
    // --- SEA FOOD SNACKS ---
    {
      id: "sfs-1",
      name: "Prawn Chilly",
      category: "Sea Food Snacks",
      price: 229.00,
      description: "Stir-fried prawns in a fiery chili garlic sauce with onions, peppers, and Asian spices.",
      image: "",
      tags: "Seafood, Spicy",
      available: true
    },
    {
      id: "sfs-2",
      name: "Prawn Golden Fry",
      category: "Sea Food Snacks",
      price: 229.00,
      description: "Prawns coated in golden breadcrumbs, deep-fried until crisp, served with tangy dipping sauce.",
      image: "",
      tags: "Seafood, Crunchy",
      available: true
    },
    {
      id: "sfs-3",
      name: "Dragon Prawn",
      category: "Sea Food Snacks",
      price: 229.00,
      description: "Crispy prawns tossed in a spicy Indo-Chinese sauce with garlic, chilies, and bell peppers.",
      image: "",
      tags: "Seafood, Indo-Chinese, Spicy",
      available: true
    },
    {
      id: "sfs-4",
      name: "Apollo Fish",
      category: "Sea Food Snacks",
      price: 229.00,
      description: "South Indian-style crispy fish tossed in spicy masala with curry leaves and tangy seasoning.",
      image: "",
      tags: "Seafood, South Indian, Spicy",
      available: true
    },
    {
      id: "sfs-5",
      name: "Fish Chilly",
      category: "Sea Food Snacks",
      price: 229.00,
      description: "Crispy fish cubes tossed in spicy Indo-Chinese sauce with onions, chilies, and bell peppers.",
      image: "",
      tags: "Seafood, Indo-Chinese, Spicy",
      available: true
    },
    {
      id: "sfs-6",
      name: "Fish Butter Toast",
      category: "Sea Food Snacks",
      price: 229.00,
      description: "Spiced fish mixture spread on toast, pan-fried with butter for a crispy, flavorful bite.",
      image: "",
      tags: "Seafood, Savory",
      available: true
    },
    // --- TANDOORI SNACKS ---
    {
      id: "tds-1",
      name: "Tandoori Chicken Full",
      category: "Tandoori Snacks",
      price: 439.00,
      description: "Whole chicken marinated in spiced yogurt, char-grilled for a smoky, juicy tandoori experience.",
      image: "",
      tags: "Tandoori, Classic",
      available: true
    },
    {
      id: "tds-2",
      name: "Tandoori Chicken Half",
      category: "Tandoori Snacks",
      price: 239.00,
      description: "Half chicken marinated in yogurt, spices, and grilled to smoky, flavorful tandoori excellence.",
      image: "",
      tags: "Tandoori, Classic",
      available: true
    },
    {
      id: "tds-3",
      name: "Tangdi Kabab",
      category: "Tandoori Snacks",
      price: 163.00,
      description: "Chicken drumsticks roasted in tandoor for deep, smoky flavor.",
      image: "",
      tags: "Tandoori, Chicken",
      available: true
    },
    {
      id: "tds-4",
      name: "Makh Malai Prawn Tikka",
      category: "Tandoori Snacks",
      price: 248.00,
      description: "Prawns in rich malai marinade, infused with spices and grilled to smoky, creamy perfection.",
      image: "",
      tags: "Tandoori, Creamy, Seafood",
      available: true
    },
    {
      id: "tds-5",
      name: "Chicken Makh Malai Tikka",
      category: "Tandoori Snacks",
      price: 219.00,
      description: "Tender chicken cubes marinated in white cream spices, grilled to juicy, melt-in-mouth perfection.",
      image: "",
      tags: "Tandoori, Creamy",
      available: true
    },
    {
      id: "tds-6",
      name: "Chicken Sholy Kabab",
      category: "Tandoori Snacks",
      price: 248.00,
      description: "Spicy, smoky chicken kebabs cooked over charcoal with bold Indian masalas and herbs.",
      image: "",
      tags: "Tandoori, Spicy",
      available: true
    },
    {
      id: "tds-7",
      name: "Chicken Cotton Kabab",
      category: "Tandoori Snacks",
      price: 219.00,
      description: "Soft, fluffy chicken kebabs made with creamy, rich marinade and delicate spices, tandoor grilled.",
      image: "",
      tags: "Tandoori, Mild",
      available: true
    },
    {
      id: "tds-8",
      name: "Chicken Gilt Seek Kabab",
      category: "Tandoori Snacks",
      price: 248.00,
      description: "Minced chicken skewered with aromatic spices and herbs, cooked till golden in tandoor.",
      image: "",
      tags: "Tandoori, Savory",
      available: true
    },
    {
      id: "tds-9",
      name: "Malai Prawn Tikka",
      category: "Tandoori Snacks",
      price: 248.00,
      description: "Juicy prawns marinated in creamy malai and spices, grilled to tender, flavorful bites.",
      image: "",
      tags: "Tandoori, Creamy",
      available: true
    },
    {
      id: "tds-10",
      name: "Aloo Tandoori Tikka",
      category: "Tandoori Snacks",
      price: 181.00,
      description: "Tandoor-roasted potatoes marinated in tangy spices and herbs, crispy outside, soft inside.",
      image: "",
      tags: "Tandoori, Veg",
      available: true
    },
    // --- PANEER CURRY ---
    {
      id: "pc-1",
      name: "Paneer Masala",
      category: "Paneer Curry",
      price: 181.00,
      description: "Paneer cubes in a spiced onion-tomato gravy with traditional Indian flavors.",
      image: "",
      tags: "Veg, Curry",
      available: true
    },
    {
      id: "pc-2",
      name: "Paneer Methi Chaman",
      category: "Paneer Curry",
      price: 219.00,
      description: "Paneer cooked in creamy spinach and fenugreek gravy with mild spices.",
      image: "",
      tags: "Veg, Creamy",
      available: true
    },
    {
      id: "pc-3",
      name: "Paneer Butter Masala",
      category: "Paneer Curry",
      price: 219.00,
      description: "Soft paneer in rich, buttery tomato gravy with a touch of fresh cream.",
      image: "",
      tags: "Veg, Classic",
      available: true
    },
    {
      id: "pc-4",
      name: "Paneer Dewani Handi",
      category: "Paneer Curry",
      price: 219.00,
      description: "Paneer and vegetables in a mildly spiced, creamy handi-style curry.",
      image: "",
      tags: "Veg, Creamy",
      available: true
    },
    {
      id: "pc-5",
      name: "Shahi Paneer",
      category: "Paneer Curry",
      price: 219.00,
      description: "Royal paneer dish in a rich, creamy gravy of ground nuts and mild spices.",
      image: "",
      tags: "Veg, Royal",
      available: true
    },
    {
      id: "pc-6",
      name: "Paneer Matka",
      category: "Paneer Curry",
      price: 200.00,
      description: "Clay pot-cooked paneer curry with earthy flavors and aromatic Indian spices.",
      image: "",
      tags: "Veg, Earthy",
      available: true
    },
    // --- MUSHROOM CURRY ---
    {
      id: "mc-1",
      name: "Mushroom Masala",
      category: "Mushroom Curry",
      price: 200.00,
      description: "Mushrooms cooked in a spiced onion-tomato gravy with classic Indian flavors.",
      image: "",
      tags: "Veg, Curry",
      available: true
    },
    {
      id: "mc-2",
      name: "Mushroom Kadai",
      category: "Mushroom Curry",
      price: 200.00,
      description: "Mushrooms sautéed with capsicum, onions, and freshly ground kadai spices in thick masala.",
      image: "",
      tags: "Veg, Spicy",
      available: true
    },
    // --- MIX VEG ---
    {
      id: "mv-1",
      name: "Mix Veg",
      category: "Mix Veg",
      price: 130.00,
      description: "Seasonal vegetables cooked together in a mildly spiced, flavorful masala gravy.",
      image: "",
      tags: "Veg, Healthy",
      available: true
    },
    // --- VEG SPECIAL CURRY ---
    {
      id: "vsc-1",
      name: "Veg Special Curry",
      category: "Veg Special Curry",
      price: 210.00,
      description: "Chef's special vegetable curry with rich spices, cream, and mixed seasonal vegetables.",
      image: "",
      tags: "Veg, Special",
      available: true
    },
    {
      id: "vsc-2",
      name: "Veg Keema Handi",
      category: "Veg Special Curry",
      price: 181.00,
      description: "Minced vegetables slow-cooked in handi style with robust spices and rich, thick gravy.",
      image: "",
      tags: "Veg, Spicy",
      available: true
    },
    // --- CHICKEN CURRY ---
    {
      id: "cc-1",
      name: "Chicken Murgh Musallam",
      category: "Chicken",
      price: 250.00,
      description: "Whole tandoori chicken simmered in rich egg-infused butter gravy and royal spices.",
      image: "",
      tags: "Non-Veg, Premium",
      available: true
    },
    {
      id: "cc-2",
      name: "Andhra Chicken Curry",
      category: "Chicken",
      price: 200.00,
      description: "Traditional spicy chicken curry prepared with a fiery mix of Guntur chilies and coconut masala.",
      image: "",
      tags: "Non-Veg, Spicy",
      available: true
    },
    {
      id: "cc-3",
      name: "Chicken Matka",
      category: "Chicken",
      price: 200.00,
      description: "Clay pot slow-cooked chicken curry with earthy flavors and freshly ground tandoor spices.",
      image: "",
      tags: "Non-Veg, Earthy",
      available: true
    },
    {
      id: "cc-4",
      name: "Chicken Kosha",
      category: "Chicken",
      price: 181.00,
      description: "Richly caramelized Bengali-style dry chicken curry cooked in mustard oil with spices.",
      image: "",
      tags: "Non-Veg, Spicy",
      available: true
    },
    {
      id: "cc-5",
      name: "Chicken Butter Masala",
      category: "Chicken",
      price: 200.00,
      description: "Char-grilled chicken chunks cooked in rich, buttery, creamy tomato sauce.",
      image: "",
      tags: "Non-Veg, Classic",
      available: true
    },
    {
      id: "cc-6",
      name: "Chicken Malai Masala",
      category: "Chicken",
      price: 248.00,
      description: "Chicken chunks slow-cooked in highly rich, mild, and creamy cashew-nut marinade.",
      image: "",
      tags: "Non-Veg, Creamy",
      available: true
    },
    {
      id: "cc-7",
      name: "Chicken Laziz Handi",
      category: "Chicken",
      price: 200.00,
      description: "Rich chicken curry prepared in handi pot with yogurt, bell peppers, and fresh coriander.",
      image: "",
      tags: "Non-Veg, Savory",
      available: true
    },
    // --- MUTTON CURRY ---
    {
      id: "mt-1",
      name: "Mutton Kosha",
      category: "Mutton",
      price: 219.00,
      description: "Caramelized, slow-roasted mutton pieces cooked with thick onion gravy and whole spices.",
      image: "",
      tags: "Non-Veg, Spicy",
      available: true
    },
    {
      id: "mt-2",
      name: "Mutton Rogan Josh",
      category: "Mutton",
      price: 248.00,
      description: "Classic Kashmiri mutton curry cooked in yogurt, ginger, and aromatic red chilies.",
      image: "",
      tags: "Non-Veg, Classic",
      available: true
    },
    {
      id: "mt-3",
      name: "Mutton Dhaba Gosht",
      category: "Mutton",
      price: 281.00,
      description: "Rustic highway dhaba style mutton curry cooked with spices, garlic, and fresh green chilies.",
      image: "",
      tags: "Non-Veg, Rustic, Spicy",
      available: true
    },
    {
      id: "mt-4",
      name: "Mutton Matka",
      category: "Mutton",
      price: 248.00,
      description: "Slow-cooked mutton in clay pot with rustic herbs and rich Indian spices.",
      image: "",
      tags: "Non-Veg, Earthy",
      available: true
    },
    {
      id: "mt-5",
      name: "Mutton Laal Maas",
      category: "Mutton",
      price: 248.00,
      description: "Fiery Rajasthani mutton curry prepared with hot Mathania red chilies and garlic oil.",
      image: "",
      tags: "Non-Veg, Extra Spicy",
      available: true
    },
    // --- BIRIYANI ---
    {
      id: "by-1",
      name: "Chicken Biryani",
      category: "Biriyani",
      price: 181.00,
      description: "Fragrant Basmati rice cooked with layered spiced chicken, rose water, and pure saffron.",
      image: "",
      tags: "Biryani, Classic",
      available: true
    },
    {
      id: "by-2",
      name: "Chicken Dum Biryani",
      category: "Biriyani",
      price: 191.00,
      description: "Traditionally dum-cooked slow layered biryani with juicy marinated chicken pieces.",
      image: "",
      tags: "Biryani, Premium",
      available: true
    },
    {
      id: "by-3",
      name: "Chicken Joint Biryani",
      category: "Biriyani",
      price: 239.00,
      description: "Layered saffron rice served with a whole spiced chicken joint leg piece.",
      image: "",
      tags: "Biryani, Signature",
      available: true
    },
    {
      id: "by-4",
      name: "Mutton Dum Biryani",
      category: "Biriyani",
      price: 286.00,
      description: "Royal layered basmati rice slow dum-cooked with tender marinated mutton chunks.",
      image: "",
      tags: "Biryani, Royal",
      available: true
    },
    {
      id: "by-5",
      name: "Mutton Fry Biryani (Small Rice)",
      category: "Biriyani",
      price: 277.00,
      description: "Authentic regional-style biryani prepared with aromatic small-grain rice and deep-fried mutton masala.",
      image: "",
      tags: "Biryani, Spicy",
      available: true
    },
    {
      id: "by-6",
      name: "Mutton Pulao (Small Rice)",
      category: "Biriyani",
      price: 305.00,
      description: "Aromatic, mildly spiced small-grain ghee rice cooked with juicy mutton stock.",
      image: "",
      tags: "Biryani, Rich",
      available: true
    },
    {
      id: "by-7",
      name: "Egg Kosha Biryani",
      category: "Biriyani",
      price: 153.00,
      description: "Layered saffron rice served with spicy caramelized egg masala.",
      image: "",
      tags: "Biryani, Savory",
      available: true
    },
    // --- PRAWN CURRY ---
    {
      id: "pr-1",
      name: "Prawn Chettinad",
      category: "Prawn",
      price: 229.00,
      description: "Fiery prawns cooked in traditional Chettinad toasted spice blend and black pepper.",
      image: "",
      tags: "Seafood, Spicy",
      available: true
    },
    {
      id: "pr-2",
      name: "Prawn Hyderabadi",
      category: "Prawn",
      price: 229.00,
      description: "Rich prawn curry prepared in style of Hyderabadi Nizami cashew nut gravy.",
      image: "",
      tags: "Seafood, Rich",
      available: true
    },
    {
      id: "pr-3",
      name: "Prawn Laziz Handi",
      category: "Prawn",
      price: 248.00,
      description: "Luscious prawn curry slow-cooked in handi clay pot with fresh cream and coriander.",
      image: "",
      tags: "Seafood, Creamy",
      available: true
    },
    {
      id: "pr-4",
      name: "Prawn Kosha",
      category: "Prawn",
      price: 229.00,
      description: "Rich and thick dry prawn curry cooked with caramelized onions, mustard oil, and peppers.",
      image: "",
      tags: "Seafood, Spicy",
      available: true
    },
    // --- DAL ---
    {
      id: "dal-0",
      name: "Andhra Special Dal",
      category: "Dal",
      price: 229.00,
      description: "Our house special slow-cooked yellow lentils seasoned with ghee and royal spices.",
      image: "",
      tags: "Veg, Classic",
      available: true
    },
    {
      id: "dal-1",
      name: "Dal Fry",
      category: "Dal",
      price: 67.00,
      description: "Traditional yellow lentils tempered with onions, tomatoes, green chilies, and coriander.",
      image: "",
      tags: "Veg, Mild",
      available: true
    },
    {
      id: "dal-2",
      name: "Plain Dal",
      category: "Dal",
      price: 38.00,
      description: "Comforting, mildly salted boiled yellow lentils without any tempering.",
      image: "",
      tags: "Veg, Healthy, Mild",
      available: true
    },
    {
      id: "dal-3",
      name: "Dal Tadka",
      category: "Dal",
      price: 77.00,
      description: "Slow-cooked yellow lentils tempered with red chilies, garlic, cumin, and pure ghee.",
      image: "",
      tags: "Veg, Popular",
      available: true
    },
    // --- ROTI & NAAN ---
    {
      id: "rn-1",
      name: "Tandoori Roti",
      category: "Roti & Naan",
      price: 24.00,
      description: "Whole wheat bread baked in a traditional clay tandoor oven.",
      image: "",
      tags: "Veg, Tandoori",
      available: true
    },
    {
      id: "rn-2",
      name: "Masala Kulcha",
      category: "Roti & Naan",
      price: 86.00,
      description: "Soft, leavened flatbread stuffed with spiced potato, onions, and fresh coriander.",
      image: "",
      tags: "Veg, Stuffed",
      available: true
    },
    {
      id: "rn-3",
      name: "Butter Naan",
      category: "Roti & Naan",
      price: 48.00,
      description: "Traditional leavened flatbread baked in clay oven, brushed with pure butter.",
      image: "",
      tags: "Veg, Classic",
      available: true
    },
    {
      id: "rn-4",
      name: "Lachha Paratha",
      category: "Roti & Naan",
      price: 38.00,
      description: "Multi-layered flaky whole wheat flatbread baked golden-crisp in tandoor.",
      image: "",
      tags: "Veg, Crispy",
      available: true
    },
    {
      id: "rn-5",
      name: "Plain Naan",
      category: "Roti & Naan",
      price: 33.00,
      description: "Classic soft leavened white flour flatbread baked in tandoor.",
      image: "",
      tags: "Veg, Plain",
      available: true
    },
    {
      id: "rn-6",
      name: "Aloo Paratha",
      category: "Roti & Naan",
      price: 57.00,
      description: "Whole wheat flatbread stuffed with spiced mashed potatoes, griddle pan-fried.",
      image: "",
      tags: "Veg, Popular",
      available: true
    },
    {
      id: "rn-7",
      name: "Garlic Naan",
      category: "Roti & Naan",
      price: 67.00,
      description: "Soft leavened flatbread topped with minced garlic, parsley, and butter.",
      image: "",
      tags: "Veg, Signature",
      available: true
    },
    {
      id: "rn-8",
      name: "Phulka",
      category: "Roti & Naan",
      price: 10.00,
      description: "Soft, thin puffed whole wheat flatbread cooked directly over open flame.",
      image: "",
      tags: "Veg, Healthy",
      available: true
    },
    {
      id: "rn-9",
      name: "Masala Naan",
      category: "Roti & Naan",
      price: 86.00,
      description: "Leavened flatbread topped with traditional Indian dry spice blend and black cumin.",
      image: "",
      tags: "Veg, Spicy",
      available: true
    },
    {
      id: "rn-10",
      name: "Plain Paratha",
      category: "Roti & Naan",
      price: 24.00,
      description: "Classic flaky layered whole wheat flatbread cooked on iron griddle.",
      image: "",
      tags: "Veg, Plain",
      available: true
    },
    // --- FRIED RICE ---
    {
      id: "fr-1",
      name: "Andhra Special Veg Fried Rice",
      category: "Fried Rice",
      price: 181.00,
      description: "Fragrant stir-fried rice tossed with fresh garden vegetables, hot green chilies, and Andhra spices.",
      image: "",
      tags: "Veg, Spicy, Special",
      available: true
    },
    {
      id: "fr-2",
      name: "Chicken Fried Rice",
      category: "Fried Rice",
      price: 153.00,
      description: "Wok-tossed long grain Basmati rice prepared with tender chicken chunks, scrambled eggs, and soy sauce.",
      image: "",
      tags: "Non-Veg, Classic",
      available: true
    },
    {
      id: "fr-3",
      name: "Veg Mix Fried Rice",
      category: "Fried Rice",
      price: 162.00,
      description: "Colorful wok-fried rice prepared with a rich mix of chopped vegetables, baby corn, and spring onions.",
      image: "",
      tags: "Veg, Colorful",
      available: true
    },
    {
      id: "fr-4",
      name: "Mix Non-Veg Fried Rice",
      category: "Fried Rice",
      price: 239.00,
      description: "Gourmet combination fried rice loaded with prawns, chicken chunks, eggs, and rich Asian seasonings.",
      image: "",
      tags: "Non-Veg, Premium",
      available: true
    },
    {
      id: "fr-5",
      name: "Jeera Rice",
      category: "Traditional Rice",
      price: 100.00,
      description: "Aromatic Basmati rice seasoned with dry cumin seeds, pure ghee, and fresh coriander.",
      image: "",
      tags: "Veg, Aromatic",
      available: true
    },
    {
      id: "fr-6",
      name: "Egg Fried Rice",
      category: "Fried Rice",
      price: 124.00,
      description: "Classic simple street-style fried rice tossed with seasoned scrambled eggs and light pepper.",
      image: "",
      tags: "Non-Veg, Popular",
      available: true
    },
    {
      id: "fr-7",
      name: "Steamed Rice (Half/Full)",
      category: "Traditional Rice",
      price: 48.00,
      description: "Fluffy, perfectly boiled high-quality long-grain Basmati rice.",
      image: "",
      tags: "Veg, Healthy",
      available: true
    },
    {
      id: "fr-8",
      name: "Andhra Special Chicken Fried Rice",
      category: "Fried Rice",
      price: 210.00,
      description: "Fiery, wok-tossed rice cooked with marinated spicy Andhra fried chicken chunks and curry leaves.",
      image: "",
      tags: "Non-Veg, Spicy, Signature",
      available: true
    }
  ]
};
export default CONFIG;
