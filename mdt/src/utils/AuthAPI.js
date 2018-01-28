import axios from 'axios';
import APIUtils from './APIUtils';
import request from 'superagent';
import Config from './config';

const AuthAPI = {
	login(user) {
		return new Promise((resolve, reject) => {
            axios.post(Config.apiUrl + 'oauth/token')
				.send(user)
				.set({'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
					'Cache-Control': 'no-cache'})
				.withCredentials()
				.end((err, res) => {
				console.log(err);
				console.log(res);
				if (err || !res.ok) {
					if(res && res.statusCode === 400 ){
						ons.notification.alert('Sorry, this username & password combination is wrong').then(function() {
							localStorage.clear();
							//hashHistory.push('/');
							reject();
						});
					}else if(res && res.statusCode === 401){
						ons.notification.alert('Unauthorized').then(function() {
							localStorage.clear();
							//hashHistory.push('/');
							reject();
						});
					}else
					{
						reject();
					}
				} else {
					resolve(APIUtils.normalizeResponse(JSON.parse(res.text)));
				}
			});
		});
	},
};
export default AuthAPI;