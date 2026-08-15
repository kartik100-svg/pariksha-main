import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MyProfile } from "../services/authService";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaPen, 
  FaCheck, 
  FaGraduationCap,
  FaCircleCheck,
  FaLocationDot,
  FaCalendarDays,
  FaUsers,
  FaAddressCard,
  FaHouse,
  FaGear,
  FaXmark,
  FaFloppyDisk
} from "react-icons/fa6";

function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Initial State: Only user name and email from AuthContext, all other fields empty!
  const [formData, setFormData] = useState({
    name: user?.name || user?.username || user?.fullName || (user?.email ? user.email.split("@")[0] : ""),
    email: user?.email || "",
    phone: user?.phone || "",
    parentPhone: user?.parentPhone || "",
    dob: user?.dob || "",
    location: user?.location || "",
    aspiration: user?.aspiration || "",
    role: (user?.role || "STUDENT").toUpperCase(),
    bio: user?.bio || "",
    skills: user?.skills 
      ? (Array.isArray(user.skills) ? user.skills : user.skills.split(",").map(s => s.trim()).filter(Boolean))
      : [],
  });

  useEffect(() => {
    let isMounted = true;
    if (user) {
      syncUserState(user);
    }
    setLoading(true);
    MyProfile()
      .then((data) => {
        if (data && isMounted) {
          updateUser(data);
          syncUserState(data);
        }
      })
      .catch((err) => console.error("Profile fetch error:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const syncUserState = (userData) => {
    const displayName = userData.name || userData.username || userData.fullName || (userData.email ? userData.email.split("@")[0] : "");
    setFormData((prev) => ({
      ...prev,
      name: displayName || prev.name,
      email: userData.email || prev.email,
      phone: userData.phone || prev.phone || "",
      parentPhone: userData.parentPhone || prev.parentPhone || "",
      dob: userData.dob || prev.dob || "",
      location: userData.location || prev.location || "",
      aspiration: userData.aspiration || prev.aspiration || "",
      role: (userData.role || "STUDENT").toUpperCase(),
      bio: userData.bio || prev.bio || "",
      skills: userData.skills 
        ? (Array.isArray(userData.skills) ? userData.skills : userData.skills.split(",").map(s => s.trim()).filter(Boolean))
        : prev.skills,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const rawVal = e.target.value;
    const skillsArray = rawVal.split(",").map(s => s.trim());
    setFormData((prev) => ({ ...prev, skills: skillsArray }));
  };

  const handleToggleEdit = (e) => {
    if (e) e.preventDefault();
    if (isEditing) {
      // Save updated data
      const cleanedSkills = Array.isArray(formData.skills) 
        ? formData.skills.filter(Boolean)
        : formData.skills.split(",").map(s => s.trim()).filter(Boolean);

      const updatedUser = {
        ...(user || {}),
        name: formData.name,
        phone: formData.phone,
        parentPhone: formData.parentPhone,
        dob: formData.dob,
        location: formData.location,
        aspiration: formData.aspiration,
        bio: formData.bio,
        skills: cleanedSkills,
      };

      updateUser(updatedUser);
      setFormData(prev => ({ ...prev, skills: cleanedSkills }));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    }
    setIsEditing(!isEditing);
  };

  const displayName = formData.name || (formData.email ? formData.email.split("@")[0] : "User");
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "U";

  if (loading && !user) {
    return (
      <div className="w-full py-20 px-4 flex items-center justify-center">
        <div className="p-8 bg-[#121826]/90 border border-slate-800 rounded-3xl text-center flex flex-col items-center gap-4 shadow-2xl">
          <div className="w-10 h-10 border-3 border-violet-600/20 border-t-purple-500 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-300">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-6 lg:px-8 text-left flex flex-col gap-6 font-sans pb-24 lg:pb-12">
      
      {/* SUCCESS TOAST ALERT */}
      {savedSuccess && (
        <div className="w-full p-4 rounded-2xl bg-emerald-950/90 border border-emerald-700/60 text-emerald-300 text-xs sm:text-sm font-medium flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-2.5">
            <FaCheck className="text-emerald-400 text-base" />
            <span>Profile details updated and saved successfully!</span>
          </div>
          <button onClick={() => setSavedSuccess(false)} className="text-emerald-400 hover:text-white cursor-pointer">
            <FaXmark />
          </button>
        </div>
      )}

      {/* TOP HEADER & EDIT ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 pb-3 border-b border-slate-800/80">
        <div className="flex flex-col text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight m-0">Profile Overview</h1>
          <p className="text-xs sm:text-sm text-slate-400 m-0 mt-1">Manage your academic identity and personal information</p>
        </div>

        <button 
          onClick={handleToggleEdit}
          className={`px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer flex items-center gap-2 transition-all duration-200 shadow-lg shrink-0 self-start sm:self-auto ${
            isEditing 
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-emerald-500 text-white shadow-emerald-950/50" 
              : "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 border-violet-500/80 text-white shadow-purple-950/50 hover:scale-[1.02]"
          }`}
        >
          {isEditing ? (
            <>
              <FaFloppyDisk className="text-xs" /> Save Profile
            </>
          ) : (
            <>
              <FaPen className="text-xs" /> Edit Profile
            </>
          )}
        </button>
      </div>

      {/* HERO PROFILE CARD */}
      <div className="relative bg-[#121826]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden transition-all duration-300 hover:border-slate-700/80">
        {/* Top ambient highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {/* Avatar Circle with Verified Badge */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full p-1 bg-gradient-to-br from-violet-600 via-indigo-500 to-purple-800 shadow-[0_0_25px_rgba(124,58,237,0.35)]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white overflow-hidden">
                {initial}
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-purple-600 border-2 border-[#121826] flex items-center justify-center text-white text-xs shadow-md">
              <FaCircleCheck />
            </div>
          </div>

          {/* User Header Info */}
          <div className="flex flex-col gap-3.5 w-full text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-start gap-3">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-white bg-slate-900/90 border border-violet-500/60 rounded-xl px-3 py-1.5 outline-none focus:ring-2 focus:ring-violet-500/30"
                />
              ) : (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white m-0 tracking-tight">{displayName}</h2>
              )}

              <span className="self-center sm:self-auto px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-800/60 text-purple-300 text-xs font-bold tracking-wider uppercase">
                {formData.role}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 m-0 font-medium">
              {formData.email || "No email provided"}
            </p>

            {/* Location & Aspirations Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
              <div className="bg-[#171e2e] border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2">
                <FaLocationDot className="text-slate-400 text-xs" />
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location (e.g. New Delhi)"
                    className="bg-transparent border-b border-slate-600 text-white outline-none w-36 text-xs sm:text-sm"
                  />
                ) : (
                  <span>{formData.location || "Location not specified"}</span>
                )}
              </div>

              <div className="bg-[#171e2e] border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2">
                <FaGraduationCap className="text-slate-400 text-xs" />
                {isEditing ? (
                  <input
                    type="text"
                    name="aspiration"
                    value={formData.aspiration}
                    onChange={handleChange}
                    placeholder="Goal (e.g. Aspirant)"
                    className="bg-transparent border-b border-slate-600 text-white outline-none w-36 text-xs sm:text-sm"
                  />
                ) : (
                  <span>{formData.aspiration || "Academic goal not set"}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-COLUMN GRID (ABOUT ME & PERSONAL INFORMATION) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ABOUT ME CARD (Empty initially unless updated by user!) */}
        <div className="lg:col-span-5 bg-[#121826]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-2xl gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl border-b border-slate-800/80 pb-4">
              <FaUser className="text-violet-400 text-lg" />
              <span>About Me</span>
            </div>

            {isEditing ? (
              <textarea
                name="bio"
                rows={6}
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write something about yourself..."
                className="w-full p-3.5 bg-[#171e2e] border border-violet-500/50 rounded-xl text-slate-200 text-xs sm:text-sm leading-relaxed outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            ) : (
              <p className={`text-xs sm:text-sm leading-relaxed m-0 font-normal ${formData.bio ? "text-slate-300" : "text-slate-500 italic"}`}>
                {formData.bio || "No bio added yet. Click 'Edit Profile' to add your bio."}
              </p>
            )}
          </div>

          {/* Skills & Interests Section (Empty initially unless updated!) */}
          <div className="flex flex-col gap-3 pt-2 border-t border-slate-800/60">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              SKILLS & INTERESTS
            </span>
            
            {isEditing ? (
              <input
                type="text"
                value={Array.isArray(formData.skills) ? formData.skills.join(", ") : formData.skills}
                onChange={handleSkillsChange}
                placeholder="Enter skills separated by comma (e.g. Math, Physics)"
                className="w-full p-3 bg-[#171e2e] border border-violet-500/50 rounded-xl text-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {Array.isArray(formData.skills) && formData.skills.filter(Boolean).length > 0 ? (
                  formData.skills.filter(Boolean).map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-semibold hover:border-purple-600 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">No skills listed yet.</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* PERSONAL INFORMATION CARD (Only User Name & Email pre-filled, others empty initially!) */}
        <div className="lg:col-span-7 bg-[#121826]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 text-left shadow-2xl flex flex-col gap-6">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl border-b border-slate-800/80 pb-4">
            <FaAddressCard className="text-violet-400 text-lg" />
            <span>Personal Information</span>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleToggleEdit}>
            {/* Grid Row 1: Full Name & Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
                <div className="relative flex items-center">
                  <FaUser className="absolute left-3.5 text-slate-500 text-sm pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    readOnly={!isEditing}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className={`w-full py-3 pl-10 pr-4 bg-[#161c2b] border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm font-medium outline-none transition-all ${
                      isEditing ? "border-violet-500/80 bg-slate-900/90 focus:ring-2 focus:ring-violet-500/30" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Date of Birth (Empty initially) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Date of Birth</label>
                <div className="relative flex items-center">
                  <FaCalendarDays className="absolute left-3.5 text-slate-500 text-sm pointer-events-none" />
                  <input
                    type="text"
                    name="dob"
                    value={formData.dob}
                    readOnly={!isEditing}
                    onChange={handleChange}
                    placeholder={isEditing ? "e.g. 15 Aug 2005" : "Not specified"}
                    className={`w-full py-3 pl-10 pr-4 bg-[#161c2b] border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm font-medium outline-none transition-all ${
                      isEditing ? "border-violet-500/80 bg-slate-900/90 focus:ring-2 focus:ring-violet-500/30" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Email Address (Pre-filled) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
              <div className="relative flex items-center opacity-80">
                <FaEnvelope className="absolute left-3.5 text-slate-500 text-sm pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  placeholder="Your Email Address"
                  className="w-full py-3 pl-10 pr-4 bg-[#161c2b] border border-slate-800 rounded-xl text-slate-300 text-xs sm:text-sm font-medium outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Phone Number (Empty initially) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Phone Number</label>
              <div className="relative flex items-center">
                <FaPhone className="absolute left-3.5 text-slate-500 text-sm pointer-events-none" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  readOnly={!isEditing}
                  onChange={handleChange}
                  placeholder={isEditing ? "e.g. +91 98765 43210" : "Not specified"}
                  className={`w-full py-3 pl-10 pr-4 bg-[#161c2b] border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm font-medium outline-none transition-all ${
                    isEditing ? "border-violet-500/80 bg-slate-900/90 focus:ring-2 focus:ring-violet-500/30" : ""
                  }`}
                />
              </div>
            </div>

            {/* Parent/Guardian Contact (Empty initially) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase">Parent/Guardian Contact</label>
              <div className="relative flex items-center">
                <FaUsers className="absolute left-3.5 text-slate-500 text-sm pointer-events-none" />
                <input
                  type="text"
                  name="parentPhone"
                  value={formData.parentPhone}
                  readOnly={!isEditing}
                  onChange={handleChange}
                  placeholder={isEditing ? "e.g. +91 98765 00000" : "Not specified"}
                  className={`w-full py-3 pl-10 pr-4 bg-[#161c2b] border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm font-medium outline-none transition-all ${
                    isEditing ? "border-violet-500/80 bg-slate-900/90 focus:ring-2 focus:ring-violet-500/30" : ""
                  }`}
                />
              </div>
            </div>

            {/* Save Button inside Form */}
            {isEditing && (
              <button
                type="submit"
                className="mt-3 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm cursor-pointer shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2.5 transition-all duration-200"
              >
                <FaFloppyDisk className="text-sm" />
                <span>Save Profile Changes</span>
              </button>
            )}

          </form>
        </div>

      </div>

      {/* MOBILE RESPONSIVE BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f1422]/95 border-t border-slate-800/90 backdrop-blur-lg px-4 py-2.5 z-50 flex items-center justify-around shadow-2xl">
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 text-xs font-medium cursor-pointer transition-all px-3 py-1"
        >
          <FaHouse className="text-base" />
          <span>Home</span>
        </button>

        <button 
          onClick={() => navigate("/assessment")}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 text-xs font-medium cursor-pointer transition-all px-3 py-1"
        >
          <FaGraduationCap className="text-base" />
          <span>Courses</span>
        </button>

        <button 
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center gap-1 text-purple-400 font-semibold text-xs cursor-pointer px-4 py-1.5 rounded-2xl bg-purple-950/60 border border-purple-800/50 transition-all shadow-md"
        >
          <FaUser className="text-base" />
          <span>Profile</span>
        </button>

        <button 
          onClick={() => navigate("/dashboard")}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 text-xs font-medium cursor-pointer transition-all px-3 py-1"
        >
          <FaGear className="text-base" />
          <span>Settings</span>
        </button>
      </div>

    </div>
  );
}

export default Profile;