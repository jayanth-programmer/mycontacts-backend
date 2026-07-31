import { useEffect, useState, useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  LuPlus,
  LuSearch,
  LuEye,
  LuPencil,
  LuTrash2,
  LuMail,
  LuPhone,
  LuContact,
} from "react-icons/lu";
import { useContacts } from "../../contexts/ContactContext";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import { SkeletonRow, SkeletonCard } from "../../components/ui/Skeleton";
import useDebounce from "../../hooks/useDebounce";
import { formatDate } from "../../utils/formatDate";
import { ROUTES, SORT_OPTIONS } from "../../constants";
import styles from "./Contacts.module.css";

const ContactsList = () => {
  const { contacts, loading, fetchContacts, removeContact } = useContacts();
  const { searchValue } = useOutletContext();
  const [localSearch, setLocalSearch] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [deleteModal, setDeleteModal] = useState({ open: false, contact: null });
  const [deleting, setDeleting] = useState(false);

  // Use global search from TopNav or local search
  const searchTerm = searchValue || localSearch;
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Filter and sort contacts
  const filteredContacts = useMemo(() => {
    let result = [...contacts];

    // Search filter
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.phone.includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "date-newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "date-oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

    return result;
  }, [contacts, debouncedSearch, sortBy]);

  const handleDelete = async () => {
    if (!deleteModal.contact) return;
    setDeleting(true);
    await removeContact(deleteModal.contact._id);
    setDeleting(false);
    setDeleteModal({ open: false, contact: null });
  };

  if (loading && contacts.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Contacts</h1>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          {[...Array(5)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
        <div className={styles.cardGrid}>
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Contacts</h1>
          <p>{contacts.length} contact{contacts.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link to={ROUTES.CONTACT_NEW}>
          <Button icon={<LuPlus />}>Add Contact</Button>
        </Link>
      </div>

      {contacts.length > 0 && (
        <>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <LuSearch className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search by name, email, or phone..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {filteredContacts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <LuSearch />
              </div>
              <h3 className={styles.emptyTitle}>No results found</h3>
              <p className={styles.emptyText}>
                No contacts match "{debouncedSearch}". Try a different search term.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added</th>
                      <th style={{ width: 100 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact._id}>
                        <td>
                          <div className={styles.nameCell}>
                            <Avatar name={contact.name} size="sm" />
                            <span className={styles.nameCellText}>
                              {contact.name}
                            </span>
                          </div>
                        </td>
                        <td className={styles.emailCell}>{contact.email}</td>
                        <td className={styles.phoneCell}>{contact.phone}</td>
                        <td className={styles.dateCell}>
                          {formatDate(contact.createdAt)}
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <Link to={`/contacts/${contact._id}`}>
                              <button className={styles.actionBtn} title="View">
                                <LuEye />
                              </button>
                            </Link>
                            <Link to={`/contacts/${contact._id}/edit`}>
                              <button className={styles.actionBtn} title="Edit">
                                <LuPencil />
                              </button>
                            </Link>
                            <button
                              className={`${styles.actionBtn} ${styles.deleteBtn}`}
                              title="Delete"
                              onClick={() =>
                                setDeleteModal({ open: true, contact })
                              }
                            >
                              <LuTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className={styles.cardGrid}>
                {filteredContacts.map((contact) => (
                  <div key={contact._id} className={styles.contactCard}>
                    <Link
                      to={`/contacts/${contact._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className={styles.cardHeader}>
                        <Avatar name={contact.name} size="md" />
                        <div className={styles.cardName}>{contact.name}</div>
                      </div>
                      <div className={styles.cardDetail}>
                        <LuMail /> {contact.email}
                      </div>
                      <div className={styles.cardDetail}>
                        <LuPhone /> {contact.phone}
                      </div>
                    </Link>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardDate}>
                        {formatDate(contact.createdAt)}
                      </span>
                      <div className={styles.cardActions}>
                        <Link to={`/contacts/${contact._id}/edit`}>
                          <button className={styles.actionBtn} title="Edit">
                            <LuPencil />
                          </button>
                        </Link>
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          title="Delete"
                          onClick={() =>
                            setDeleteModal({ open: true, contact })
                          }
                        >
                          <LuTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {contacts.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <LuContact />
          </div>
          <h3 className={styles.emptyTitle}>No contacts yet</h3>
          <p className={styles.emptyText}>
            Your contact list is empty. Add your first contact to get started!
          </p>
          <Link to={ROUTES.CONTACT_NEW}>
            <Button icon={<LuPlus />}>Add Contact</Button>
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, contact: null })}
        title="Delete Contact"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setDeleteModal({ open: false, contact: null })}
            >
              Cancel
            </Button>
            <Button variant="danger" loading={deleting} onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p style={{ color: "var(--text-secondary)" }}>
          Are you sure you want to delete{" "}
          <strong style={{ color: "var(--text-primary)" }}>
            {deleteModal.contact?.name}
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default ContactsList;
