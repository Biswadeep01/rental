import {
  doc,
  query,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { firestore } from "../config";

// ---- Home ----

export const apiGetHomeInfo = async () => {
  try {
    const homeRef = collection(firestore, "home");
    const q = query(homeRef);
    const querySnapshot = await getDocs(q);
    const home = querySnapshot.docs.map((d) => d.data());
    return home[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiPostUpdateHomeInfo = async (home) => {
  try {
    const homeRef = doc(firestore, "home", "information");
    await updateDoc(homeRef, home);
    return home;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ------

// ---- About ----

export const apiGetAboutInfo = async () => {
  try {
    const aboutRef = collection(firestore, "about");
    const q = query(aboutRef);
    const querySnapshot = await getDocs(q);
    const about = querySnapshot.docs.map((d) => d.data());
    return about[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiPostUpdateAboutInfo = async (about) => {
  try {
    const aboutRef = doc(firestore, "about", "information");
    await updateDoc(aboutRef, about);
    return about;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --------

// ---- Fleet (Addtional Options) ----

export const apiGetOptions = async () => {
  try {
    const optionsRef = collection(firestore, "options");
    const q = query(optionsRef);
    const querySnapshot = await getDocs(q);
    const options = querySnapshot.docs.map((d) => d.data());
    return options[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiPostUpdateOptions = async (options) => {
  try {
    const fleetRef = doc(firestore, "options", "options");
    await updateDoc(fleetRef, options);
    return options;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --------

// ---- Blogs ----

export const apiGetBlogs = async () => {
  try {
    const blogsRef = collection(firestore, "blogs");
    const q = query(blogsRef);
    const querySnapshot = await getDocs(q);
    const blogs = querySnapshot.docs.map((d) => d.data());
    return blogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiPostCreateBlog = async (blog) => {
  try {
    const blogRef = doc(firestore, "blogs", blog.id);
    await setDoc(blogRef, blog);
    return blog;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiPutUpdateBlog = async (blog) => {
  try {
    const blogRef = doc(firestore, "blogs", blog.id);
    await updateDoc(blogRef, blog);
    return blog;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiDeleteBlog = async (id) => {
  try {
    const blogRef = doc(firestore, "blogs", id);
    await deleteDoc(blogRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --------

// ---- Services ----

export const apiGetServices = async () => {
  try {
    const servicesRef = collection(firestore, "services");
    const q = query(servicesRef);
    const querySnapshot = await getDocs(q);
    const services = querySnapshot.docs.map((d) => d.data());
    return services;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiPostCreateService = async (service) => {
  try {
    const serviceRef = doc(firestore, "services", service.id);
    await setDoc(serviceRef, service);
    return service;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiPutUpdateService = async (service) => {
  try {
    const serviceRef = doc(firestore, "services", service.id);
    await updateDoc(serviceRef, service);
    return service;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiDeleteService = async (id) => {
  try {
    const serviceRef = doc(firestore, "services", id);
    await deleteDoc(serviceRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ---- Testimonials ----

export const apiGetTestimonials = async () => {
  try {
    const testimonialsRef = collection(firestore, "testimonials");
    const q = query(testimonialsRef);
    const querySnapshot = await getDocs(q);
    const testimonials = querySnapshot.docs.map((d) => d.data());
    return testimonials;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiPostCreateTestimonial = async (testimonial) => {
  try {
    const testimonialRef = doc(firestore, "testimonials", testimonial.id);
    await setDoc(testimonialRef, testimonial);
    return testimonial;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiDeleteTestimonial = async (id) => {
  try {
    const testimonialRef = doc(firestore, "testimonials", id);
    await deleteDoc(testimonialRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --------

// --Footer--

export const apiGetFooterInfo = async (section = "information") => {
  try {
    const footerRef = collection(firestore, "footer");
    const q = query(footerRef);
    const querySnapshot = await getDocs(q);
    const footer = querySnapshot.docs.map((d) => d.data());
    let sectionIndex = 0;

    if (section === "information") {
      sectionIndex = 1;
    } else if (section === "quickLinks") {
      sectionIndex = 2;
    } else if (section === "address") {
      sectionIndex = 0;
    }

    return footer[sectionIndex];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiPostUpdateFooterInfo = async (
  footer,
  section = "information"
) => {
  try {
    const footerRef = doc(firestore, "footer", section);
    await updateDoc(footerRef, footer);
    return footer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --------
