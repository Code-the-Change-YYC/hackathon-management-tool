"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINK_STYLES =
  "md:mx-10 align-center text-center text-1xl md:text-md my-12 flex flex-row gap-16 text-[#FF6B54]";
const ACTIVE_LINK_STYLES = "underline";
const INPUT_STYLES: string =
  "rounded-full  border-4 border-white bg-[#FFFFFF]  ps-3  py-2 my-2 text-sm md:text-md bg-white/30";
const BUTTON_STYLES =
  " rounded-full border-4 border-white bg-[#FF6B54] px-10  md:px-12 py-2 my-2 text-white";
const TEXT_COLOR_GRAY = "text-gray-400"; // CSS class for gray text color
const TEXT_COLOR_BLACK = "text-black"; // CSS class for black text color

const FORM_STYLES = "md:mx-10 flex flex-col";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  wantMeals: boolean;
  allergies: string;
  checkInStatus: boolean;
};

const UserProfile = () => {
  const [activeLink, setActiveLink] = useState("/participant/profile");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showCancelSave, setShowCancelSave] = useState<boolean>(false);

  const [wantMeals, setWantMeals] = useState<boolean>(true);

  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    wantMeals: wantMeals,
    allergies: "",
    checkInStatus: false,
  });

  useEffect(() => {
    setFormState((prevState) => ({ ...prevState, wantMeals: wantMeals }));
  }, [wantMeals]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const createPost = () => {
    console.log(formState);
  };

  const handleEditClick = () => {
    setIsEditing((previsEditing) => !previsEditing);
    setShowCancelSave(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setShowCancelSave(false);
  };

  const handleSaveClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsEditing(false); // Exit edit mode
    setShowCancelSave(false);
    console.log("Saving changes...");
    console.log(formState); // Log the form state
  };

  const checkedIn = false; // Placeholder value for now

  return (
    <div className="flex w-full flex-col bg-[#FFD7C5]">
      <div className="px-10 md:px-16 md:py-10">
        <div className={LINK_STYLES}>
          <Link
            href="/participant/profile"
            className={`${activeLink === "/participant/profile" ? ACTIVE_LINK_STYLES : ""}`}
            onClick={() => setActiveLink("/participant/profile")}
          >
            My Details
          </Link>
          <Link
            href="/participant/profile/team-details"
            className={`${activeLink === "/participant/profile/team-details" ? ACTIVE_LINK_STYLES : ""}`}
            onClick={() => setActiveLink("/participant/profile/team-details")}
          >
            Team Details
          </Link>
          <Link href="/participant/profile/food-ticket">Food Ticket</Link>
        </div>
        <div className="mb-3 flex justify-between uppercase text-[#FF6B54] md:mx-10">
          <h1 className="mt-3 text-lg font-bold md:text-2xl">My Details</h1>
          <button className={BUTTON_STYLES} onClick={handleEditClick}>
            Edit
          </button>
        </div>
        <form className={FORM_STYLES} onSubmit={createPost}>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
            <div className="flex flex-col">
              <label>First Name</label>
              <input
                className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
                type="text"
                placeholder="First Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                name="firstName"
                disabled={!isEditing} // Disabled when not in edit mode
              />
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <input
                className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
                type="text"
                placeholder="Last Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                name="lastName"
                disabled={!isEditing} // Disabled when not in edit mode
              />
            </div>
          </div>
          <label>Email</label>
          <input
            className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
            type="text"
            placeholder="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            name="email"
            disabled={!isEditing} // Disabled when not in edit mode
          />
          <label>Password</label>
          <input
            className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
            type="password"
            placeholder="Password"
            disabled={!isEditing} // Disabled when not in edit mode
          />
          <label>Institution</label>
          <input
            className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
            type="text"
            placeholder="Institution"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            name="institution"
            disabled={!isEditing} // Disabled when not in edit mode
          />
          <label>Do you want provided meals at the hackathon?</label>
          <select
            className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
            value={wantMeals ? "Yes" : "No"}
            onChange={(e) =>
              e.target.value === "Yes"
                ? setWantMeals(true)
                : setWantMeals(false)
            }
            disabled={!isEditing} // Disabled when not in edit mode
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {wantMeals && (
            <>
              <label>Do you have any allergies?</label>
              <input
                className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
                type="text"
                placeholder="e.g. Dairy, Nuts, etc."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                name="allergies"
                disabled={!isEditing} // Disabled when not in edit mode
              />
            </>
          )}
          <p>
            Check-in Status <br />
            This status will change to &quot;Yes&quot; after you&apos;ve checked
            in on hackathon day
          </p>
          <input
            className={`${INPUT_STYLES} ${isEditing ? TEXT_COLOR_BLACK : TEXT_COLOR_GRAY}`}
            type="text"
            value={checkedIn ? "Yes" : "No"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            readOnly
          />
          <div className=" mb-10 mt-3 flex flex-col justify-between md:flex-row">
            {showCancelSave && (
              <>
                <button
                  type="button"
                  className={BUTTON_STYLES}
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={BUTTON_STYLES}
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserProfile;
