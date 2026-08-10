import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

const SKILL_LEVEL_LABEL: Record<string, string> = {
  beginner: "Pemula",
  intermediate: "Menengah",
  advanced: "Mahir",
  expert: "Ahli",
};

const LANGUAGE_LEVEL_LABEL: Record<string, string> = {
  basic: "Dasar",
  conversational: "Percakapan",
  fluent: "Lancar",
  native: "Bahasa Ibu",
};

const ACCENT_COLOR: Record<ResumeData["template"], string> = {
  modern: "#2563eb",
  classic: "#1e293b",
  minimal: "#059669",
};

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1e293b",
  },
  headerName: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 12,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    fontSize: 8.5,
    color: "#475569",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: 700,
  },
  itemSubtitle: {
    fontSize: 9,
    color: "#475569",
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 8.5,
    color: "#64748b",
  },
  description: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#334155",
    marginBottom: 6,
  },
  bulletRow: {
    fontSize: 9,
    color: "#334155",
    marginBottom: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginBottom: 6,
  },
});

export function ResumePDFDocument({ data }: { data: ResumeData }) {
  const accent = ACCENT_COLOR[data.template];
  const {
    personalInfo,
    education,
    experience,
    skills,
    certificates,
    languages,
    portfolio,
  } = data;

  return (
    <Document
      title={`CV - ${personalInfo.fullName || "Resume"}`}
      author={personalInfo.fullName || "AI Resume Builder"}
    >
      <Page size="A4" style={styles.page}>
        <Text style={[styles.headerName, { color: accent }]}>
          {personalInfo.fullName || "Nama Lengkap"}
        </Text>
        <Text style={styles.headerTitle}>{personalInfo.jobTitle || "Judul Profesi"}</Text>
        <View style={styles.contactRow}>
          {personalInfo.email && <Text>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
          {personalInfo.address && <Text>{personalInfo.address}</Text>}
          {personalInfo.website && <Text>{personalInfo.website}</Text>}
          {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
        </View>
        <View style={[styles.divider, { borderBottomColor: accent }]} />

        {personalInfo.summary && (
          <View>
            <Text style={[styles.sectionTitle, { color: accent }]}>Ringkasan</Text>
            <Text style={styles.description}>{personalInfo.summary}</Text>
          </View>
        )}

        {experience.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: accent }]}>Pengalaman Kerja</Text>
            {experience.map((item) => (
              <View key={item.id} wrap={false} style={{ marginBottom: 8 }}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>
                    {item.position || "Posisi"} — {item.company}
                  </Text>
                  <Text style={styles.itemDate}>
                    {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                  </Text>
                </View>
                {item.location && <Text style={styles.itemSubtitle}>{item.location}</Text>}
                {item.description && (
                  <Text style={styles.description}>{item.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: accent }]}>Pendidikan</Text>
            {education.map((item) => (
              <View key={item.id} wrap={false} style={{ marginBottom: 6 }}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>{item.degree || "Gelar"}</Text>
                  <Text style={styles.itemDate}>
                    {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{item.institution}</Text>
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: accent }]}>Skill</Text>
            {skills.map((item) => (
              <Text key={item.id} style={styles.bulletRow}>
                {item.name} — {SKILL_LEVEL_LABEL[item.level]}
              </Text>
            ))}
          </View>
        )}

        {languages.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: accent }]}>Bahasa</Text>
            {languages.map((item) => (
              <Text key={item.id} style={styles.bulletRow}>
                {item.name} — {LANGUAGE_LEVEL_LABEL[item.level]}
              </Text>
            ))}
          </View>
        )}

        {certificates.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: accent }]}>Sertifikat</Text>
            {certificates.map((item) => (
              <Text key={item.id} style={styles.bulletRow}>
                {item.name} — {item.issuer} ({item.issueDate})
              </Text>
            ))}
          </View>
        )}

        {portfolio.length > 0 && (
          <View>
            <Text style={[styles.sectionTitle, { color: accent }]}>Portfolio</Text>
            {portfolio.map((item) => (
              <View key={item.id} wrap={false} style={{ marginBottom: 6 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.url && <Text style={styles.itemSubtitle}>{item.url}</Text>}
                {item.description && (
                  <Text style={styles.description}>{item.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
