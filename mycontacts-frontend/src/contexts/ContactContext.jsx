import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import * as contactService from "../services/contactService";
import { useToastContext } from "./ToastContext";

const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToastContext();

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await contactService.getContacts();
      setContacts(data);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load contacts";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchContact = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const data = await contactService.getContact(id);
        setCurrentContact(data);
        return data;
      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to load contact";
        setError(message);
        toast.error(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const addContact = useCallback(
    async (contactData) => {
      setError(null);
      try {
        const data = await contactService.createContact(contactData);
        setContacts((prev) => [data, ...prev]);
        toast.success("Contact created successfully!");
        return { success: true, data };
      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to create contact";
        setError(message);
        toast.error(message);
        return { success: false, message };
      }
    },
    [toast]
  );

  const editContact = useCallback(
    async (id, contactData) => {
      setError(null);
      try {
        const data = await contactService.updateContact(id, contactData);
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? data : c))
        );
        setCurrentContact(data);
        toast.success("Contact updated successfully!");
        return { success: true, data };
      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to update contact";
        setError(message);
        toast.error(message);
        return { success: false, message };
      }
    },
    [toast]
  );

  const removeContact = useCallback(
    async (id) => {
      setError(null);
      try {
        await contactService.deleteContact(id);
        setContacts((prev) => prev.filter((c) => c._id !== id));
        toast.success("Contact deleted successfully!");
        return { success: true };
      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to delete contact";
        setError(message);
        toast.error(message);
        return { success: false, message };
      }
    },
    [toast]
  );

  const clearCurrentContact = useCallback(() => {
    setCurrentContact(null);
  }, []);

  const value = {
    contacts,
    currentContact,
    loading,
    error,
    fetchContacts,
    fetchContact,
    addContact,
    editContact,
    removeContact,
    clearCurrentContact,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};

export default ContactContext;
