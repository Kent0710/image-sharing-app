import Button from "./Button";

const Profile = () => {
    return (
        <form className="flex flex-col gap-3">
            
            <label htmlFor="username" className="block font-bold text-lg">Username</label>
            <input type="text"
                name="username"
                id="username"
                className="w-1/2 rounded-full py-3 px-6 mb-10"
                placeholder="namikazenakiri"
            />

            <label htmlFor="email" className="block font-bold text-lg">Email</label>
            <input type="email"
                name="email"
                id="email"
                className="w-1/2 rounded-full py-3 px-6 mb-10"
                placeholder="namikazenakiri@gmail.com"
            />

            <label htmlFor="password" className="block font-bold text-lg">Password</label>
            <input type="password"
                name="password"
                id="password"
                className="w-1/2 rounded-full py-3 px-6 mb-10"
                placeholder="thisinsmaikazepassword"
            />

            <label htmlFor="confirmPassword" className="block font-bold text-lg">Confirm Password</label>
            <input type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-1/2 rounded-full py-3 px-6 mb-10"
                placeholder="thisisnamiakzenakiriconfirmpassword"
            />

            <Button text="Save changes" className="bg-blue-500 w-1/2 rounded-full py-2 text-lg" type='submit' />
            <Button text="Delete account" className="bg-red-500 w-1/2 rounded-full py-2 text-lg" />

        </form>
    )
};

export default Profile;