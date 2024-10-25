import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authenticate } from "../lib/auth"; // Import the authenticate function

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch("/api/contacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }, []);

  return (
    <div>
      <h1>Your Contacts</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
