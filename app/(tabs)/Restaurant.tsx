// version 7
import DateTimePicker from '@react-native-community/datetimepicker';
import { AlertCircle, Check, } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from "react";
import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from "../Components/Button";
import Input from "../Components/Input";
import { styles } from '../Components/Mystyle';
import Select from "../Components/Select";



export default function restaurant () {
    const [ lastName , setLastName] = useState('');
    const [ firstName , setFirstName] = useState('');
    const [ email , setEmail] = useState('');
    const [ source , setSource] = useState('');
    const [reservationNumber, setReservationNumber] = useState('');
    const [ roomNumber , setRoomNumber] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [ checkIn, setCheckIn] = useState<Date>(new Date());
    const [ checkOut , setCheckOut] = useState<Date>(() => {
            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate()+1 );
            return nextDay ;
            });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [ReservationDateTime, setReservationDateTime] = useState<Date>(() => {
            const now = new Date();
                    const minDate = new Date();

                    if (now.getHours() >= 15) {
                      // Il est après 15h, on commence la réservation à partir de demain
                      minDate.setDate(now.getDate() + 1);
                    }
            minDate.setHours(19, 0, 0, 0);
            return minDate;
            });
    const [showReservationField, setShowReservationField] = useState(false);
    const isTuesday = ReservationDateTime.getDay() === 2; // 0 = Dimanche, 2 = Mardi
    const isThursday = ReservationDateTime.getDay() === 4; // 0 = Dimanche, 4 = Jeudi
    const [steakHouseAdults, setSteakHouseAdults] = useState(0);
    const [steakHouseChildren, setSteakHouseChildren] = useState(0);
    const [marocainPeople, setMarocainPeople] = useState(0);
    const [italienPeople, setItalienPeople] = useState(0);
    const [restaurantMenus, setRestaurantMenus] = useState<RestaurantMenu[]>([]);
    const [personMenus, setPersonMenus] = useState<{ [restaurantName: string]: PersonMenu[] }>({});
    const [showCakeSelection, setShowCakeSelection] = useState(false);
    const [selectedCake, setSelectedCake] = useState<number | null>(null);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const cakes = [
        { id: 1, name: "Gâteau1", price: 200, image: require('../assets/images/cake1.png') },
        { id: 2, name: "Gâteau2", price: 100, image: require('../assets/images/cake2.png') },
        { id: 3, name: "Gâteau3", price: 3936, image: require('../assets/images/cake3.png') }
    ];
    const [promoCode, setPromoCode] = useState('');
    const [isPromoValid, setIsPromoValid] = useState<boolean | null>(null);
    const [finalPrice, setFinalPrice] = useState(0);
    const [comment, setComment] = useState('');
    const [showCommentField, setShowCommentField] = useState(false);
    const[isvalide , setIsvalide] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // États de validation pour chaque champ
    const [lastNameTouched, setLastNameTouched ] = useState(false);
    const [lastNameError , setLastNameError]= useState('');
    const [firstNameTouched, setFirstNameTouched] = useState(false);
    const [firstNameError, setFirstNameError]= useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [reservationNumberTouched, setReservationNumberTouched] = useState(false);
    const [reservationNumberError, setReservationNumberError] = useState('');
    const [roomNumberTouched, setRoomNumberTouched] = useState(false);
    const [roomNumberError, setRoomNumberError] = useState('');
    const [numberOfPeopleError, setNumberOfPeopleError] = useState('');
    const [numberOfPeopleTouched, setNumberOfPeopleTouched] = useState(false);
    const [menuErrors, setMenuErrors] = useState<Record<string, { nameError?: string; menuError?: string }>>({});
    const [hasSubmittedMenus, setHasSubmittedMenus] = useState(false);




// === TYPES ===
interface APIMenuItem {
  restaurantId: number;
  restaurantName: string;
  dishName: string;
  dishType: 'Starter' | 'Main Course' | 'Dessert';
  price: number;
}

interface MenuItem {
  id: string;
  name: string;
  price?: number;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

interface RestaurantMenu {
  name: string;
  categories: MenuCategory[];
}

interface Menu {
  starter: string;
  maincourse: string;
  dessert: string;
}

interface PersonMenu {
  person: number;
  name: string;
  menu: Menu;
  expanded: boolean;
}
const mockAPIData: APIMenuItem[] = [
  {
    restaurantId: 1,
    restaurantName: 'Steak House',
    dishName: 'Green Salad',
    dishType: 'Starter',
    price: 5.5
  },
  {
    restaurantId: 1,
    restaurantName: 'Steak House',
    dishName: 'Ribeye Steak',
    dishType: 'Main Course',
    price: 15.0
  },
  {
    restaurantId: 1,
    restaurantName: 'Steak House',
    dishName: 'Vanilla Ice Cream',
    dishType: 'Dessert',
    price: 4.0
  },
  {
    restaurantId: 2,
    restaurantName: 'Marocain',
    dishName: 'Harira',
    dishType: 'Starter',
    price: 4.5
  },
  {
    restaurantId: 2,
    restaurantName: 'Marocain',
    dishName: 'Tagine d\'agneau',
    dishType: 'Main Course',
    price: 12.0
  },
  {
    restaurantId: 2,
    restaurantName: 'Marocain',
    dishName: 'Orange à la cannelle',
    dishType: 'Dessert',
    price: 3.5
  },
  {
      restaurantId: 1,
      restaurantName: 'Steak House',
      dishName: 'vegeteble salad',
      dishType: 'Starter',
      price: 5.5
    },
  {
      restaurantId: 3,
      restaurantName: 'Italien',
      dishName: 'salade',
      dishType: 'Starter',
      price: 4.5
    },
  {
        restaurantId: 3,
        restaurantName: 'Italien',
        dishName: 'pizza',
        dishType: 'Main Course',
        price: 4.5
      },
  {
          restaurantId: 3,
          restaurantName: 'Italien',
          dishName: 'jus',
          dishType: 'dessert',
          price: 9
        },
    {
            restaurantId: 3,
            restaurantName: 'Italien',
            dishName: 'pastilla',
            dishType: 'Main Course',
            price: 4.5
          },

];

const DataCode = {
  MAGIC: { type: 'reduction', valeur: 10 },   // -10%
  ILHAM22: { type: 'dh', valeur: 100 },       // -100 DHs
  ILHAM: { type: 'gratuit', valeur: 0 },      // Gratuit
};










    const handleForm = () => {
        setIsvalide(true);
        let formIsValide = true;

        setLastNameTouched(true);
            if (!lastName){setLastNameError(' ') ; formIsValide= false;} else { setLastNameError(''); }
        setFirstNameTouched(true);
            if (!firstName){setFirstNameError(' '); formIsValide= false; } else { setFirstNameError('');}
        setHasSubmitted(true);
          if (!email) {
            setEmailError("Email requis");
            formIsValide = false;
          } else if (!emailRegex.test(email)) {
            setEmailError("Adresse email invalide");
            formIsValide = false;
          } else {
            setEmailError("");
          }
        setReservationNumberTouched(true);
            if (!reservationNumber) {setReservationNumberError(' ');formIsValide = false;} else {setReservationNumberError('');}
        setRoomNumberTouched(true);if (!roomNumber) {setRoomNumberError(' ');formIsValide = false;} else {setRoomNumberError('');}
        setNumberOfPeopleTouched(true);
            if (selectedCake !== null && (!numberOfPeople || numberOfPeople <= 0)) {
            setNumberOfPeopleError(' ');
            formIsValide = false;
            } else {
               setNumberOfPeopleError('');
            }
        // validation des menus des personnes

        setHasSubmittedMenus(true);
          let newErrors: typeof menuErrors = {};

          restaurantMenus.forEach((menu) => {
            const people = personMenus[menu.name] || [];

            people.forEach((person) => {
              const personKey = `${menu.name}-${person.person}`;
              const isNameEmpty = person.name.trim() === '';

              const allNone = Object.values(person.menu).every(
                (item) => item === '' || item === 'none'
              );

              newErrors[personKey] = {
                nameError: isNameEmpty ? '-Name is required' : '',
                menuError: allNone ? '-Select at least one dish (not all None)' : '',
              };
            });
          });

          setMenuErrors(newErrors);

          // Vérifie si le formulaire est valide globalement
          const formIsValid = Object.values(newErrors).every(
            (e) => !e.nameError && !e.menuError
          );




        console.log('last_name:', lastName );
        console.log('first_name:', firstName);
        console.log('email:', email);
        console.log('source:', source);
        console.log('reservation_number:', reservationNumber);
        console.log('room_number:', roomNumber);
        console.log('check_in:', checkIn);
        console.log('check_out', checkOut);
        console.log('reservation_date:', ReservationDateTime.toISOString().split('T')[0]);
        console.log('reservation_time:', ReservationDateTime.toTimeString().substring(0, 5));
        console.log('reservation_full_datetime:', ReservationDateTime.toISOString());
        console.log('Formulaire soumis !');
        console.log('selected_cake:', selectedCake);
        console.log('cake_people:', numberOfPeople);
        console.log('restaurantMenus:', restaurantMenus);
        if (!formIsValide) {
                  return;}

        // Ici vous enverriez les données à votre API
        };



  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function SelectDate ( { label , value , onChange , minimumDate = null ,}: SelectedDatesProps){
    const [showPicker , setShowPicker] = useState(false);
    const handleChange = ( event: any , selectedDate?: Date ) => {
        setShowPicker( Platform.OS === 'ios');
        if ( selectedDate){ onChange(selectedDate);}
        };
    return (
        <View style = {styles.container}>
            {label && < Text style={styles.label}> {label} </Text>}
            <TouchableOpacity
               style = {styles.input }
               onPress = { ()=> setShowPicker(true)}
               activeOpacity = {0.7}
            >
                <Text style ={styles.dateText}>
                   {value.toLocaleDateString( 'fr-FR', {
                       weekday: 'short',
                       day: 'numeric',
                       month: 'long',
                       year: 'numeric',
                       })}
                </Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                  value ={value}
                  mode= "date"
                  display= {Platform.OS === 'ios' ? 'spinner': 'default'}
                  onChange={handleChange}
                  locale= "fr-FR"
                  minimumDate= {minimumDate || undefined }
                  themeVariant = "light"
                /> )}
        </View>
        );
}


    const handleCheckInChange = (newDate: Date) =>{
        setCheckIn(newDate)
        if (newDate >= checkOut) {
                const nextDay = new Date(newDate);
                nextDay.setDate(nextDay.getDate() + 1);
                setCheckOut(nextDay);
        };
    };
    const minCheckoutDate = new Date(checkIn);
        minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
    const handleCheckOutChange = (newDate: Date) => {
        setCheckOut(newDate);
        checkIfShowFields();
    };
    const checkIfShowFields = () => {
    if (checkIn && checkOut) {
        setShowReservationField(true);
        setShowCakeSelection(true);
    }
    };
    const getMinimumReservationDate = () => {
        const now = new Date();
        const minDate = new Date();

        if (now.getHours() >= 15) {
          // Il est après 15h, on commence la réservation à partir de demain
          minDate.setDate(now.getDate() + 1);
        }

        return minDate;
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        const shouldKeepOpen = Platform.OS === 'ios';
        setShowDatePicker(shouldKeepOpen);
        if (selectedDate) {
        const newDate = new Date(selectedDate);
        newDate.setHours(ReservationDateTime.getHours(), ReservationDateTime.getMinutes());
        setReservationDateTime(newDate);
        // Afficher le time picker après un court délai
        setTimeout(() => {
            setShowTimePicker(true);
        }, 100);
        }
    };
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 19; hour <= 21; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                if (hour === 21 && minute > 45) break;
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(time);
            }
        }
        return slots;
    };
    const timeSlots = useMemo(() => generateTimeSlots(), []);
    const handleTimeSelect = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const newDate = new Date(ReservationDateTime);
        newDate.setHours(hours, minutes);
        setReservationDateTime(newDate);
        setShowTimePicker(false);
        };

// fonctions d'affichage conditionel du restaurant////////////////////////////////////////////////////////////////

    const calculateStayDuration = (checkIn: Date, checkOut: Date) => {
            const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Nombre de jours
            };
    const handleSteakHousePeopleChange = (adults: number, children: number) => {
      const totalPeople = adults + children;
      setSteakHouseAdults(adults);
      setSteakHouseChildren(children);

      const newMenus = [];
      for (let i = 1; i <= totalPeople; i++) {
        newMenus.push(createDefaultPersonMenu(i));
      }

      setPersonMenus(prev => ({ ...prev, ["Steak House"]: newMenus }));
    };
    const handleMarocainPeopleChange = (count: number) => {
      setMarocainPeople(count);

      const newMenus = [];
      for (let i = 1; i <= count; i++) {
        newMenus.push(createDefaultPersonMenu(i));
      }

      setPersonMenus(prev => ({ ...prev, ["Marocain"]: newMenus }));
    };
    const handleItalienPeopleChange = (count: number) => {
      setItalienPeople(count);

      const newMenus = [];
      for (let i = 1; i <= count; i++) {
        newMenus.push(createDefaultPersonMenu(i));
      }

      setPersonMenus(prev => ({ ...prev, ["Italien"]: newMenus }));
    };

// fonctions de menu du restaurant////////////////////////////////////////////////////////////////

    const addNoneOptionToMenu = (menu: RestaurantMenu): RestaurantMenu => {
      const updatedCategories = menu.categories.map((category) => {
        const hasNone = category.items.some(item => item.id === "none");
        if (!hasNone) {
          return {
            ...category,
            items: [{ id: "none", name: "None" }, ...category.items],
          };
        }
        return category;
      });

      return {
        ...menu,
        categories: updatedCategories,
      };
    };


    useEffect(() => {
      const fetchMenus = async () => {
        const groupedMenus = groupMenusByRestaurant(mockAPIData); // simule API

        // ➕ Injecte 'None' dans chaque menu
        const menusWithNone = groupedMenus.map(addNoneOptionToMenu);

        // ✅ Mets-les à jour
        setRestaurantMenus(menusWithNone);
      };

      fetchMenus();
    }, []);


    const groupMenusByRestaurant = (apiData: APIMenuItem[]): RestaurantMenu[] => {
      const grouped: { [key: string]: RestaurantMenu } = {};

      apiData.forEach((item) => {
        const restName = item.restaurantName;

        if (!grouped[restName]) {
          grouped[restName] = {
            name: restName,
            categories: []
          };
        }

        let category = grouped[restName].categories.find(c => c.name === item.dishType);
        if (!category) {
          category = {
            name: item.dishType,
            items: []
          };
          grouped[restName].categories.push(category);
        }

        category.items.push({
          id: item.dishName.toLowerCase().replace(/\s+/g, '_'),
          name: item.dishName,
          price: item.price
        });
      });

      return Object.values(grouped);
    };

    const createDefaultPersonMenu = (personNumber: number): PersonMenu => ({
      person: personNumber,
      name: '',
      menu: {
        starter: '',
        maincourse: '',
        dessert: ''
      },
      expanded: false
    });

    const togglePersonExpansion = (restaurant: string, personNumber: number) => {
      const newMenus = [...(personMenus[restaurant] || [])];
      newMenus[personNumber - 1].expanded = !newMenus[personNumber - 1].expanded;
      setPersonMenus(prev => ({ ...prev, [restaurant]: newMenus }));
    };

    const updatePersonName = (restaurant: string, personNumber: number, name: string) => {
      const newMenus = [...(personMenus[restaurant] || [])];
      newMenus[personNumber - 1].name = name;
      setPersonMenus(prev => ({ ...prev, [restaurant]: newMenus }));
    };

    const updateMenuSelection = (
      restaurant: string,
      personNumber: number,
      category: string,
      itemId: string
    ) => {
      const newMenus = [...(personMenus[restaurant] || [])];
      const categoryKey = category.toLowerCase();

      newMenus[personNumber - 1].menu[categoryKey as keyof MenuSelection] = itemId;
      setPersonMenus(prev => ({ ...prev, [restaurant]: newMenus }));

      // ➕ Mise à jour des erreurs si le formulaire a été soumis
      if (hasSubmittedMenus) {
        const personKey = `${restaurant}-${personNumber}`;
        const updatedMenu = newMenus[personNumber - 1].menu;

        const allNone = Object.values(updatedMenu).every(
          (val) => val === '' || val === 'none'
        );

        setMenuErrors(prev => ({
          ...prev,
          [personKey]: {
            ...(prev[personKey] || {}),
            menuError: allNone ? 'Select at least one dish (not all None)' : '',
          },
        }));
      }
    };


// fonctions du prix total ////////////////////////////////////////////////////////////////

const shouldShowTotal = (): boolean => {
  // Vérifie si au moins un plat a été sélectionné
  const hasMenuSelection = restaurantMenus.some(menu =>
    (personMenus[menu.name] || []).some(person =>
      Object.values(person.menu).some(value => value && value !== 'none') // Exclut les "none"
    )
  );

  // Vérifie si un gâteau est sélectionné
  const hasCakeSelection = selectedCake !== null;

  return hasMenuSelection || hasCakeSelection;
};

const calculateTotalPrice = (): number => {
  let total = 0;

  // Exemple générique :
  restaurantMenus.forEach((menu) => {
    (personMenus[menu.name] || []).forEach((person) => {
      menu.categories.forEach((category) => {
        const selectedId = person.menu[category.name.toLowerCase()];
        const item = category.items.find(i => i.id === selectedId);
        if (item && typeof item.price === 'number') {
          total += item.price;
        }
      });
    });
  });

  // Ajout gâteau
  if (selectedCake) {
    const cake = cakes.find(c => c.id === selectedCake);
    if (cake && typeof cake.price === 'number') {
      total += cake.price;
    }
  }

  return total;
};


const CalculCodePromo = (code: string, type: string, valeur: number, basePrice: number ) => {
  if (!code || !type || valeur === undefined) return { FinalPrice: basePrice, statutCode: 'invalid' };

  switch (type) {
    case 'reduction':
      return { FinalPrice: basePrice * (1 - valeur / 100), statutCode: 'valid' };
    case 'dh':
      return { FinalPrice: Math.max(basePrice - valeur, 0), statutCode: 'valid' };
    case 'gratuit':
      return { FinalPrice: 0, statutCode: 'valid' };
    default:
      return { FinalPrice: basePrice, statutCode: 'invalid' };
  }
};

const handleValidatePromo = () => {
  const codeData = DataCode[promoCode.trim().toUpperCase()];
  const total = calculateTotalPrice(); // fonction qui retourne le total actuel

  if (codeData) {
    const { FinalPrice } = CalculCodePromo(
      promoCode,
      codeData.type,
      codeData.valeur,
      total
    );
    setIsPromoValid(true);
    setFinalPrice(FinalPrice);
  } else {
    setIsPromoValid(false);
    setFinalPrice(total);
  }
};


    useEffect(() => {
      const total = calculateTotalPrice();
      const codeData = DataCode[promoCode.trim().toUpperCase()];

      if (codeData && isPromoValid) {
        const { FinalPrice } = CalculCodePromo(promoCode, codeData.type, codeData.valeur, total);
        setFinalPrice(FinalPrice);
      } else {
        setFinalPrice(total);
      }
    }, [personMenus, restaurantMenus, selectedCake, promoCode]);









return (
        <ImageBackground
            source={require('../assets/images/slider2.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
        <View style={styles.overlay}>
        <KeyboardAvoidingView behavior= {Platform.OS === "ios" ? "padding" : "height" } style = {{flex: 1}} >
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 50}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >

        <View style={styles.header}>
            <Icon name="cutlery" size={24} color="#FFF" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>Reservation Restaurants</Text>
        </View>
         <View style={styles.formContainer}>
         <View style={styles.row}>
         <View style={styles.inputWrapper}>
         <Input
          label='Last Name'
          placeholder="your last name"
          value={lastName}
          onChangeText={(text) => { setLastName(text); setLastNameTouched(true); setLastNameError(text ? '' : ' ');}}
          onBlur={() => { setLastNameTouched(true); setLastNameError(lastName ? '' : ' '); }}
          touched={lastNameTouched}
          isvalide={isvalide}
          error={lastNameError}
          />
         </View>

         <View style={styles.inputWrapper}>
         <Input
            label="First name"
            placeholder="your first name"
            value={firstName}
            onChangeText={(text)=> { setFirstName(text); setFirstNameTouched(true); setLastNAmeError(text ? '' : ' ');} }
            onBlur={() => { setFirstNameTouched(true); setFirstNameError(firstName ? '' : ' '); } }
            touched= {firstNameTouched}
            isvalide={isvalide}
            error={firstNameError}
         />
         </View>
         </View>
         <Input
           label='Email'
           placeholder="exemple@email.com"
           value={email}
           keyboardType="email-address"
           onChangeText={(text) => {
             setEmail(text);
             setEmailTouched(true);

             if (hasSubmitted) {
               // Vérification dynamique après le submit
               if (!text) setEmailError("Email requis");
               else if (!emailRegex.test(text)) setEmailError("Adresse email invalide");
               else setEmailError("");
             }
           }}

           onBlur={() => {
             setEmailTouched(true);
             if (!email) setEmailError("Email requis");
             else if (!emailRegex.test(email)) setEmailError("Adresse email invalide");
             else setEmailError("");
           }}

           touched={emailTouched}
           isvalide={isvalide}
           error={emailError}
         />

         <Input
           label='Reservation Number'
           placeholder="your reservation number"
           value={reservationNumber}
           onChangeText={(text) => {
             setReservationNumber(text);
             setReservationNumberTouched(true);
             setReservationNumberError(text ? '' : ' ');
           }}
           onBlur={() => {
             setReservationNumberTouched(true);
             setReservationNumberError(reservationNumber ? '' : ' ');
           }}
           touched={reservationNumberTouched}
           isvalide={isvalide}
           error={reservationNumberError}
         />

         <View style={styles.row}>
         <View style={styles.inputWrapper}>
         <Input
           label='Room Number'
           placeholder="your room number"
           value={roomNumber}
           onChangeText={(text) => {
             setRoomNumber(text);
             setRoomNumberTouched(true);
             setRoomNumberError(text ? '' : ' ');
           }}
           onBlur={() => {
             setRoomNumberTouched(true);
             setRoomNumberError(roomNumber ? '' : ' ');
           }}
           touched={roomNumberTouched}
           isvalide={isvalide}
           error={roomNumberError}
           keyboardType="numeric"
         />

         </View>
         <View style={styles.inputWrapper}>
         <Select
            label="Source"
            selectedValue={source}
            onValueChange={setSource}
            items={[
                {label: 'select source' , value: 'select_source' },
                {label: 'Agence' , value: 'agency'},
                {label: 'Web' , value: 'web'}
            ]}
         />
         </View>
         </View>
         <View style= {styles.row}>
         <SelectDate
            label="Check-in "
            value={checkIn}
            onChange={handleCheckInChange}
            minimumDate={null}
         />
         <SelectDate
            label="Check-out "
            value={checkOut}
            onChange= {handleCheckOutChange}
            minimumDate={minCheckoutDate}
         />
         </View>
         </View>

{/* Champ de sélection date/heure de reservation */}

{showReservationField && (

        <View style={styles.dateTimeField}>
        <Text style={styles.inputContainer}>Date et heure de réservation</Text>
        <TouchableOpacity
            style={styles.dateTimeInput}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
        >
            <Text style={styles.dateTimeText}>
                {ReservationDateTime.toLocaleDateString('fr-FR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
            </Text>
                <Text style={styles.dateTimeText}>
                {ReservationDateTime.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
        </TouchableOpacity>

{showDatePicker && (
            <DateTimePicker
                value={ReservationDateTime}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                locale="fr-FR"
                minimumDate={getMinimumReservationDate()}
                maximumDate={(() => {
                    const maxDate = new Date();
                    maxDate.setDate(maxDate.getDate() + 14);
                    return maxDate;
                })()}
                themeVariant="light"
            />
        )}

{/* TimePicker Modal */}
{showTimePicker && (
    <View style={styles.timePickerModal}>
        <View style={styles.timePickerContainer}>
            <Text style={styles.timePickerTitle}>Choisissez l'heure</Text>
            <View style={styles.timeSlotsGrid}>
                {timeSlots.map((time, index) => {
                    const currentTime = ReservationDateTime.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }).replace(':', '');
                    const isSelected = time.replace(':', '') === currentTime;
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.timeSlotButton,
                                isSelected && styles.timeSlotButtonSelected
                            ]}
                            onPress={() => handleTimeSelect(time)}
                        >
                            <Text style={[
                                styles.timeSlotText,
                                isSelected && styles.timeSlotTextSelected
                            ]}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    </View>
)}


{/* Affichage conditionnel des restaurants */}
<Text style={styles.sectionTitle}>Restaurants</Text>

{calculateStayDuration(checkIn, checkOut) >= 4 ? (
  <View>
    {/* Steak House */}
    <View style={styles.restaurantContainer}>
      <Image
        source={require('../assets/images/img.png')}
        style={styles.cardImage}
      />
      <Text style={styles.cardName}>Steak House</Text>

      <View style={styles.peopleContainer}>
        <Text style={styles.peopleLabel}>Adults</Text>
        <TextInput
          style={styles.numberInput}
          keyboardType="numeric"
          value={steakHouseAdults.toString()}
          onChangeText={(text) => handleSteakHousePeopleChange(Number(text) || 0, steakHouseChildren)}

        />

        <Text style={styles.peopleLabel}>Children</Text>
        <TextInput
          style={styles.numberInput}
          keyboardType="numeric"
          value={steakHouseChildren.toString()}
          onChangeText={(text) => handleSteakHousePeopleChange(steakHouseAdults, Number(text) || 0)}
        />
      </View>
    </View>

    {/* Marocain */}
<View style={[styles.restaurantContainer, isTuesday && { opacity: 0.5 }]}>
  <Image
    source={require('../assets/images/img_1.png')}
    style={[styles.cardImage, isTuesday && { opacity: 0.5 }]}
    blurRadius={isTuesday ? 2 : 0}
  />
  <Text style={styles.cardName}>Marocain</Text>

  <View style={styles.peopleContainer}>
    <Text style={styles.peopleLabel}>Number of People</Text>
    <TextInput
      style={styles.numberInput}
      keyboardType="numeric"
      value={marocainPeople.toString()}
      onChangeText={(text) =>
        !isTuesday && handleMarocainPeopleChange(Number(text) || 0)
      }
      editable={!isTuesday}
    />
  </View>
    {isTuesday && (
      <Text style={styles.restrictionMessage}>
        Reservations are not allowed at the Moroccan restaurant on Tuesdays.
      </Text>
    )}
</View>

{/* Italien */}
<View style={[styles.restaurantContainer, isThursday && { opacity: 0.5 }]}>
  <Image
    source={require('../assets/images/img_2.png')}
    style={[styles.cardImage, isThursday && { opacity: 0.5 }]}
    blurRadius={isThursday ? 2 : 0}
  />
  <Text style={styles.cardName}>Italien</Text>

  <View style={styles.peopleContainer}>
    <Text style={styles.peopleLabel}>Number of People</Text>
    <TextInput
      style={styles.numberInput}
      keyboardType="numeric"
      value={italienPeople.toString()}
      onChangeText={(text) =>
        !isThursday && handleItalienPeopleChange(Number(text) || 0)
      }
      editable={!isThursday}
    />
  </View>
  {isThursday && (
    <Text style={styles.restrictionMessage}>
      Reservations are not allowed at the Italian restaurant on Thursdays.
    </Text>
  )}
</View>
  </View>
) : (
    <View>
    {/* Steak House */}
    <View style={styles.restaurantContainer}>
      <Image
        source={require('../assets/images/img.png')}
        style={styles.cardImage}
      />
      <Text style={styles.cardName}>Steak House</Text>

      <View style={styles.peopleContainer}>
        <Text style={styles.peopleLabel}>Adults</Text>
        <TextInput
          style={styles.numberInput}
          keyboardType="numeric"
          value={steakHouseAdults.toString()}
          onChangeText={(text) => handleSteakHousePeopleChange(Number(text) || 0, steakHouseChildren)}
        />

        <Text style={styles.peopleLabel}>Children</Text>
        <TextInput
          style={styles.numberInput}
          keyboardType="numeric"
          value={steakHouseChildren.toString()}
          onChangeText={(text) => handleSteakHousePeopleChange(Number(text) || 0, steakHouseChildren)}
        />
      </View>
    </View>
    </View>
)}

{/* Section des menus */}
{restaurantMenus.map((menu) => {
  const peopleMenus = personMenus[menu.name] || [];

  if (peopleMenus.length === 0) return null;

  return (
    <View key={menu.name} style={styles.menuContainer}>
      <Text style={styles.menuTitle}>Restaurant Menu: {menu.name}</Text>

      {peopleMenus.map((person) => {
        const personKey = `${menu.name}-${person.person}`;
        const personError = menuErrors[personKey] || {};
        const isValidName = person.name.trim().length > 0;
        const allPlatesNoneOrEmpty = Object.values(person.menu).every(v => v === '' || v === 'none');
        const showCheck = hasSubmittedMenus && isValidName && !allPlatesNoneOrEmpty;
        const showError = hasSubmittedMenus && (!isValidName || allPlatesNoneOrEmpty);

        return (
          <View key={personKey} style={styles.personContainer}>
            <TouchableOpacity
              style={styles.personHeader}
              onPress={() => togglePersonExpansion(menu.name, person.person)}
            >
              <Text style={styles.personTitle}>Person {person.person}</Text>
              <View style={styles.iconContainer}>

                {showCheck && <Check color="green" size={20} />}
                {showError && <AlertCircle color="red" size={20} />}
                <Icon
                  name={person.expanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#000"
                />

              </View>
            </TouchableOpacity>

            {person.expanded && (
              <View>
                {/* Champ nom */}
                <Input
                  label="Name"
                  placeholder="Enter full name"
                  value={person.name}
                  onChangeText={(text) => {
                    updatePersonName(menu.name, person.person, text);
                    // Mise à jour immédiate des erreurs en temps réel
                    if (hasSubmittedMenus) {
                      const newErrors = { ...menuErrors };
                      const nameValid = text.trim().length > 0;
                      newErrors[personKey] = {
                        ...newErrors[personKey],
                        nameError: nameValid ? '' : '-Name is required',
                      };
                      setMenuErrors(newErrors);
                    }
                  }}
                  style={[
                    styles.inputStyle,
                    hasSubmittedMenus && personError.nameError
                      ? { borderColor: 'red' }
                      : hasSubmittedMenus && !personError.nameError
                      ? { borderColor: 'green' }
                      : {},
                  ]}
                />

                {hasSubmittedMenus && personError.nameError && (
                  <Text style={{ color: 'red', marginTop: 4 }}>
                    {personError.nameError}
                  </Text>
                )}


                {/* Erreur des plats */}
                {menuErrors[`${menu.name}-${person.person}`]?.menuError && (
                  <Text style={{ color: 'red', marginBottom: 8 }}>
                    {menuErrors[`${menu.name}-${person.person}`].menuError}
                  </Text>
                )}
                {/* Plats */}
                {menu.categories.map((category) => (
                  <View key={category.name} style={styles.menuType}>
                    <Text style={styles.typeTitle}>{category.name}</Text>

                    {category.items.map((item) => {
                      const isSelected =
                        person.menu[category.name.toLowerCase() as keyof Menu] === item.id;

                      return (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.typeItem}
                          onPress={() =>
                            updateMenuSelection(menu.name, person.person, category.name, item.id)
                          }
                        >
                          <View style={styles.checkboxContainer}>
                            <View
                              style={[
                                styles.checkbox1,
                                isSelected && styles.checkboxSelected,
                              ]}
                            >
                              {isSelected && (
                                <Icon name="check" size={12} color="#FFF" />
                              )}
                            </View>
                          </View>
                          <Text style={styles.menuItemText}>{item.name}</Text>
                          {item.price !== undefined && (
                            <Text style={styles.price}>{item.price} DHs</Text>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
})}



{/* Affichage conditionnel des gateaux */}
<Text style={styles.sectionTitle}>Birthday Cake</Text>
{showCakeSelection && (
    <View >

        <View style={styles.peopleContainer}>
            <Text style={styles.inputContainer}>Number of people for the birthday cake </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
              <TextInput
                style={[
                  styles.numberInput,
                  numberOfPeopleTouched && numberOfPeopleError
                    ? { borderColor: 'red', borderWidth: 1 }
                    : numberOfPeopleTouched && !numberOfPeopleError
                    ? { borderColor: 'green', borderWidth: 1 }
                    : {}
                ]}
                keyboardType="numeric"
                value={numberOfPeople.toString()}
                onChangeText={(text) => {
                  const number = Number(text) || 0;
                  setNumberOfPeople(number);
                  setNumberOfPeopleTouched(true);

                  if (selectedCake !== null && (!number || number <= 0)) {
                    setNumberOfPeopleError(' ');
                  } else {
                    setNumberOfPeopleError('');
                  }
                }}
                onBlur={() => {
                  setNumberOfPeopleTouched(true);
                  if (selectedCake !== null && (!numberOfPeople || numberOfPeople <= 0)) {
                    setNumberOfPeopleError(' ');
                  } else {
                    setNumberOfPeopleError('');
                  }
                }}
              />

              {/* ✅ Icône alignée à droite du champ */}
              {numberOfPeopleTouched && (
                <>
                  {numberOfPeopleError ? (
                    <AlertCircle color="red" size={20} style={{ marginLeft: 8 }} />
                  ) : (
                    <Check color="green" size={20} style={{ marginLeft: 8 }} />
                  )}
                </>
              )}
            </View>

            {/* 🧨 Message d’erreur */}
            {numberOfPeopleTouched && numberOfPeopleError !== '' && (
              <Text style={{ color: 'red', marginLeft: 10, marginTop: 4 }}>{numberOfPeopleError}</Text>
            )}


        </View>

        <View style={styles.cakesGrid}>
            {cakes.map((cake) => (
                <View key={cake.id} style={styles.cakeCard}>
                    <Image
                        source={cake.image}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardName}>{cake.name}</Text>
                    <Text style={styles.price}>{cake.price} DHs</Text>

                    <TouchableOpacity
                        style={[
                            styles.radioButton,
                            selectedCake === cake.id && styles.radioButtonSelected
                        ]}
                        onPress={() => {
                          if (selectedCake === cake.id) {
                            setSelectedCake(null); // désélectionner si déjà sélectionné
                          } else {
                            setSelectedCake(cake.id); // sélectionner un nouveau gâteau
                          }
                        }}

                    >
                        {selectedCake === cake.id && <View style={styles.radioButtonInner} />}
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    </View>
)}
</View>
)}


{shouldShowTotal() && (
    <View style={styles.totalContainer}>
    {/* add commentaire */}
<View style={styles.commentToggleContainer}>
  <Text style={styles.commentLabel}>Add a comment</Text>
  <TouchableOpacity
    style={styles.checkbox}
    onPress={() => setShowCommentField(!showCommentField)}
  >
    <View style={styles.checkboxBox}>
      {showCommentField && <View style={styles.checkboxInner} />}
    </View>
  </TouchableOpacity>
</View>

{showCommentField && (
  <TextInput
    style={styles.commentInput}
    placeholder="Type your comment here"
    value={comment}
    onChangeText={setComment}
    multiline
  />
)}


  {/* code promo */}
  <Text style={styles.totalLabel}>Code promo</Text>
<View style={styles.promoRow}>
  <TextInput
    style={[styles.promoInput, { flex: 1 }]}
    placeholder="Entrez le code"
    value={promoCode}
    onChangeText={(text) => {
      setPromoCode(text);
      setIsPromoValid(null);
    }}
  />
  <TouchableOpacity
    onPress={handleValidatePromo}
    style={[
      styles.promoButton,
      promoCode.trim() === '' && styles.promoButtonDisabled
    ]}
    disabled={promoCode.trim() === ''}
  >
    <Text style={styles.promoButtonText}>check</Text>
  </TouchableOpacity>

</View>

{isPromoValid === true && (
  <Text style={styles.promoValid}>✅ Code valide</Text>
)}
{isPromoValid === false && (
  <Text style={styles.promoInvalid}>❌ Code invalide</Text>
)}


    {/* Prix total */}
    <View style={styles.priceContainer}>
      <Text style={styles.totalLabel}>Prix Total :</Text>
      <Text style={styles.totalValue}>{finalPrice.toFixed(2)} DHs</Text>
    </View>
  </View>
)}


         <Button
            title="Reserver"
            onPress={handleForm}
         />
        </ScrollView>
       </KeyboardAvoidingView>
       </View>
       </ImageBackground>
    );
}
