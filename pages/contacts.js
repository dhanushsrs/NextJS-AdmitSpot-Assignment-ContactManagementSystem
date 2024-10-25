import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redirect to login if no token
        return;
      }

      const res = await fetch("/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
    };

    fetchContacts();
  }, [router]);

  return (
    <div>
      <h1>Your Contacts</h1>
      <ul>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} - {contact.email}
            </li>
          ))
        ) : (
          <li>No contacts available.</li>
        )}
      </ul>
    </div>
  );
}
