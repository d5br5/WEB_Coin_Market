const LOGIN_KEY = "LOGIN_KEY";
const USER_NAME = "USER_NAME";

const [isLoggedIn, setIsLoggedIn] = useState(false);
const [user, setUser] = useState(null);
const [init, setInit] = useState(false);

async function keyLogin() {
	const {ok} = await loginByKey(lsKey);
	setIsLoggedIn(true);
}

useEffect(() => {
	const lsKey = localStorage.getItem(LOGIN_KEY);
	console.log(lsKey);
	if (lsKey === null) {
		setUser(null);
		setIsLoggedIn(false);
	} else {
		try {
			keyLogin();
		} catch (e) {
			localStorage.removeItem(LOGIN_KEY);
			setIsLoggedIn(false);
			setUser(null);
		}
	}
	setInit(true);
}, []);
