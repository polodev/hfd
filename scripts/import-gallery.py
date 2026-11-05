"""Import the two supplied photo batches without changing their original content.

Usage: python3 scripts/import-gallery.py /path/to/batch-a /path/to/batch-b
Originals receive descriptive names. Small WebP previews are used in the gallery.
Black screenshot margins are recorded for CSS presentation; originals stay intact.
"""
from pathlib import Path
import hashlib
import json
import shutil
import sys
from PIL import Image, ImageStat

ROOT = Path(__file__).resolve().parents[1]
CATEGORIES = {"dental": "Dental care", "aesthetics": "Facial aesthetics", "doctors": "Our doctors", "training": "Workshops & training", "practice": "Our practice"}

# Ordered by the original filenames within each batch. Each supplied image has
# its own record, including alternate artwork and smaller versions.
RECORDS = [
    ("a01", "practice", "haris-family-dentistry-brand", "Smile again", "Practice artwork introducing orthodontics, endodontics, implants, cosmetic dentistry, facial aesthetics and laser care."),
    ("a02", "practice", "dental-and-facial-aesthetics-service-guide", "Our treatment guide", "Advanced dentistry: E-max and zirconia crowns, implants, extractions, dentures, bleaching, tooth-coloured fillings and root canal treatment. Dentofacial aesthetics: braces, aligners and gummy smile correction. Facial aesthetics: permanent makeup, lash lift and tint, mesotherapy, PRP for face and hair, and ear and nose piercing."),
    ("a03", "practice", "haris-family-dentistry-qr-poster", "Discover the practice", "Clinic identity poster with a QR code and an overview of dental and aesthetic services."),
    ("a04", "dental", "cavity-and-gum-health-consultation", "Cavity & gum health", "Dental consultation for cavities, bad breath, gum bleeding, swollen gums and loose teeth. Contact the clinic for current consultation arrangements."),
    ("a05", "aesthetics", "dermal-fillers-and-botox-information", "Fillers & Botox", "An introduction to injectable aesthetic treatments for facial volume, contour and expression lines. Assessment and suitability are discussed with the doctor."),
    ("a06", "dental", "smile-makeover-consultation", "Smile makeover", "Clinic poster introducing smile assessment and cosmetic dentistry. A treatment plan begins with an individual dental consultation."),
    ("a07", "dental", "orthodontics-braces-and-bite-assessment", "Braces & bite assessment", "Orthodontic consultation for crowded or crooked teeth, bite concerns and dental alignment."),
    ("a08", "aesthetics", "glutathione-treatment-poster", "Glutathione information poster", "Supplied promotional artwork about glutathione injections and skin tone. The wording in the artwork is promotional; discuss evidence, risks and suitability with the doctor."),
    ("a09", "practice", "haris-family-dentistry-contact-artwork", "Stay in touch", "Practice contact and social media artwork. Use the website contact page for appointment enquiries."),
    ("a10", "dental", "dental-scaling-and-gum-care", "Scaling & gum care", "Professional dental cleaning, plaque and tartar removal, oral hygiene and gum-health information."),
    ("a11", "practice", "haris-family-dentistry-services-artwork", "Dentistry & aesthetics", "An overview of the clinic's orthodontics, endodontics, implants, cosmetic dentistry and facial aesthetics."),
    ("a12", "aesthetics", "mole-wart-and-skin-tag-consultation", "Mole, wart & skin tag consultation", "Supplied skin-treatment poster. Moles, warts and skin tags require assessment before any cosmetic removal is considered."),
    ("a13", "aesthetics", "prp-facial-treatment", "PRP facial treatment", "Clinic information about platelet-rich plasma (PRP), skin texture, fine lines and scars. Treatment options are discussed after assessment."),
    ("a14", "aesthetics", "hydrafacial-cleansing-and-hydration", "HydraFacial care", "Facial cleansing and hydration information, with discussion of skin texture, tone and individual skin concerns."),
    ("a15", "aesthetics", "carbon-laser-facial", "Carbon laser facial", "Clinic poster introducing carbon laser facial treatment for skin texture, pores and uneven tone."),
    ("a16", "aesthetics", "diode-laser-hair-removal", "Diode laser hair reduction", "Information about diode laser hair reduction. The doctor can advise on skin type, treatment areas and a suitable session plan."),
    ("a17", "aesthetics", "ipl-photofacial", "IPL photofacial", "Clinic artwork introducing intense pulsed light (IPL), skin tone and sun-related skin concerns."),
    ("a18", "aesthetics", "laser-hair-reduction-treatment-areas", "Laser hair reduction areas", "Laser hair reduction enquiries for the upper lip, face, under chin, hands and legs. Supplied screenshot poster."),
    ("a19", "aesthetics", "hydrafacial-treatment-alternate-poster", "HydraFacial treatment guide", "Alternate version of the clinic's cleansing and hydration facial poster."),
    ("a20", "dental", "zirconia-dental-crowns", "Zirconia crowns", "Tooth-coloured, metal-free zirconia crowns for restoring front or back teeth, subject to dental assessment."),
    ("a21", "dental", "dental-jewellery-tooth-gems", "Dental jewellery", "Tooth gems and cosmetic dental jewellery. Ask about professional placement, cleaning and removal."),
    ("a22", "dental", "professional-teeth-whitening-bleaching", "Teeth whitening", "Professional bleaching for tooth stains and smile appearance. The poster also highlights oral hygiene and following the dentist's advice."),
    ("a23", "dental", "tooth-extraction-and-aftercare", "Tooth extraction", "Extraction planning, local anaesthesia and post-treatment care. The dentist will explain the procedure and appropriate aftercare."),
    ("a24", "dental", "tooth-coloured-composite-fillings", "Tooth-coloured fillings", "Composite restorations for decayed teeth, with colour matching and preservation of remaining tooth structure."),
    ("a25", "dental", "complete-dentures-and-denture-care", "Complete dentures", "Replacement options for missing teeth, with guidance on daily cleaning, handling and regular dental reviews."),
    ("a26", "dental", "childrens-mixed-dentition-orthodontic-trainers", "Early orthodontic guidance", "Assessment of jaw development, tooth alignment and oral habits during a child's mixed-dentition years. A dentist can advise whether a trainer is suitable."),
    ("a27", "dental", "child-friendly-dental-treatment", "Children's dental care", "A child-friendly approach to dental visits, cavity prevention, brushing habits and family involvement."),
    ("a28", "aesthetics", "ear-piercing-and-aftercare", "Ear piercing & aftercare", "Clinic information about earlobe piercing, hygiene, single-use studs and aftercare guidance."),
    ("a29", "doctors", "dr-haris-muhammad-wali-ur-rahman-profile", "Dr. Haris Muhammad Wali-ur-Rahman", "Associate Professor and Head, Department of Dental Pharmacology, Bangladesh Dental College. Chief Consultant and Mentor. Smile design and aesthetic restoration; Bioclear Method and injection molding trainer. Profile contact: 01712157578 / 01787667977."),
    ("a30", "dental", "root-canal-treatment-natural-tooth-care", "Root canal treatment", "Root canal care for infected teeth, with assessment of whether single-visit treatment is appropriate and whether a protective crown is needed."),
    ("a31", "doctors", "dr-sufia-rahaman-brishty-profile", "Dr. Sufia Rahaman Brishty", "Consultant and Facial Aesthetician. BDS (DU), PGDAC (India), Fellowship in Facial Aesthetic and Aesthetic Medicine (Phoenix, AZ, USA), Masters in Micropigmentation (Phoenix, AZ, USA). Trained in fixed orthodontics and braces. BMDC registration 5508."),
    ("b01", "training", "aesthetic-masterclasses-basic-to-advanced", "Aesthetic masterclasses", "Basic-to-advanced aesthetic training announcement. Contact the clinic for current course dates and eligibility."),
    ("b02", "training", "permanent-makeup-and-cosmetology-training", "Permanent makeup & cosmetology", "Hands-on training announcement with Dr. Sufia Rahaman Brishty. Course enquiries: 01787667977 / 01915697841. Contact the clinic for current details."),
    ("b03", "training", "advanced-botox-hands-on-workshop", "Advanced Botox workshop", "Training announcement with Dr. Sufia: upper-face anatomy, brow and smile areas, masseter and neck treatments, hyperhidrosis, injection safety and complication management."),
    ("b04", "training", "dr-sufia-hands-on-aesthetics-course", "Hands-on aesthetics course", "Dr. Sufia's course artwork lists microblading, micropigmentation, ombre and powder brows, lip colour, lash lifting, HydraFacial, dermaplaning, PRP facial, mesotherapy, BB Glow, chemical peeling, scalp micropigmentation and camouflage techniques."),
    ("b05", "training", "facial-aesthetics-certificate-course", "Facial aesthetics certificate course", "Certificate hands-on course announcement with Dr. Sufia Rahaman Brishty. Poster enquiry number: 01886697841. Ask the clinic for current course details."),
    ("b06", "training", "five-day-aesthetics-course-highlights", "Aesthetics course highlights", "Five-day course artwork covering Botox, fillers, thread lifting, PRP, microneedling, mesotherapy, facials, micropigmentation, microblading, permanent makeup, chemical peeling and laser topics. This is an archived course announcement."),
    ("b07", "training", "crown-and-bridge-preparation-workshop", "Crown & bridge preparation", "Dr. Haris's crown and bridge preparation workshop announcement featuring the reverse preparation technique. Archived event artwork."),
    ("b08", "training", "clinical-training-chairside-demonstration", "Chairside clinical training", "A supplied photograph of a supervised clinical demonstration at the practice."),
    ("b09", "training", "dr-haris-chairside-teaching-session", "Learning at the dental chair", "Dr. Haris and participants during a hands-on clinical teaching session."),
    ("b10", "training", "smile-design-composite-workshop-september-2026", "Smile design workshop · September 2026", "Archived workshop announcement dated 25 September 2026, 9 am–5 pm. Principles of smile design, aesthetic composite restoration, the Bioclear Method and injection molding with Dr. Haris."),
    ("b11", "training", "dr-haris-hands-on-dental-mentoring", "Hands-on dental mentoring", "Dr. Haris guiding participants during a dental demonstration at the clinic."),
    ("b12", "training", "smile-design-composite-workshop-october-2026", "Smile design workshop · October 2026", "Archived workshop announcement dated 23 October 2026, 9 am–5 pm. Smile design, treatment planning, Bioclear matrices, anatomical layering, finishing and injection molding with Dr. Haris."),
    ("b13", "training", "training-room-presentation-equipment", "Inside the training room", "Presentation equipment and workstations arranged for a hands-on course."),
    ("b14", "training", "small-group-practical-training", "Small-group practical learning", "Participants practising clinical techniques in a supervised small-group session."),
    ("b15", "training", "aesthetics-classroom-learning", "Aesthetics classroom session", "Participants attending an in-person teaching session."),
    ("b16", "training", "supervised-clinical-workshop-group", "Clinical workshop in practice", "A group of participants observing a supervised clinical demonstration."),
    ("b17", "training", "hands-on-clinical-workshop-participants", "Hands-on workshop participants", "Another view of participants learning together during a clinical workshop."),
    ("b18", "training", "classroom-presentation-and-discussion", "Presentation & discussion", "A classroom presentation and group discussion at the practice."),
    ("b19", "training", "workshop-certificate-presentation-collage", "Certificate presentations", "Supplied collage of workshop participants receiving certificates."),
    ("b20", "training", "dr-sufia-practical-aesthetics-training-collage", "Practical aesthetics training", "Supplied collage showing Dr. Sufia guiding practical training sessions."),
]

def main():
    batches = dict(zip("ab", map(Path, sys.argv[1:3])))
    if len(batches) != 2:
        raise SystemExit(__doc__)
    sources = {f"{batch}{i:02}": p for batch, folder in batches.items() for i, p in enumerate(sorted(folder.glob("*.jpeg")), 1)}
    if set(sources) != {r[0] for r in RECORDS}:
        raise SystemExit("Unexpected photo inventory; check the two supplied batches.")
    gallery = []
    for ident, category, slug, title, description in RECORDS:
        source = sources[ident]
        folder = ROOT / "assets/images/gallery" / category
        folder.mkdir(parents=True, exist_ok=True)
        dest = folder / (slug + ".jpeg")
        shutil.copy2(source, dest)
        with Image.open(source) as im:
            im = im.convert("RGB")
            width, height = im.size
            top, bottom = 0, height
            # Record solid black padding only; never trim clinical or poster content.
            if ident in ("a18", "b01", "b05", "b06"):
                while top < height and max(ImageStat.Stat(im.crop((0, top, width, top + 1))).mean) < 12:
                    top += 1
                while bottom > top and max(ImageStat.Stat(im.crop((0, bottom - 1, width, bottom))).mean) < 12:
                    bottom -= 1
            im.thumbnail((520, 700))
            preview = folder / (slug + "-preview.webp")
            im.save(preview, "WEBP", quality=85, method=6)
        gallery.append(dict(id=ident, category=category, category_label=CATEGORIES[category], slug=slug, title=title, description=description,
            image="/" + str(dest.relative_to(ROOT)), thumbnail="/" + str(preview.relative_to(ROOT)), width=width, height=height,
            visible_height=bottom-top, offset=round(-100*top/(bottom-top), 5), source_batch="batch-"+ident[0], source_filename=source.name,
            sha256=hashlib.sha256(source.read_bytes()).hexdigest()))
    (ROOT / "_data").mkdir(exist_ok=True)
    (ROOT / "_data/gallery.json").write_text(json.dumps(gallery, ensure_ascii=False, indent=2) + "\n")
    print(f"Imported {len(gallery)} originals and generated gallery previews.")

if __name__ == "__main__":
    main()
