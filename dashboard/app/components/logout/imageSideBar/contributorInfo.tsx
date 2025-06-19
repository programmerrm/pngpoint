import { Link } from "react-router";

export function ContributorInfo({ user }: { user: any }) {
    if (!user) return null;
    return (
        <div className="flex flex-col gap-2.5">
            <h4 className="text-base font-medium">Contributor :</h4>
            {user.username && <span>Username : {user.username}</span>}
            {user.first_name && <span>First Name : {user.first_name}</span>}
            {user.last_name && <span>Last Name : {user.last_name}</span>}
            {user.email && (
                <Link className="text-blue-600" to={`mailto:${user.email}`}>
                    Email : {user.email}
                </Link>
            )}
        </div>
    );
}
