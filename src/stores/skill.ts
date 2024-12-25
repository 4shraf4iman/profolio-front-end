import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api'

interface Skill {
  id?: number
  skill: string
  desciption: string
  image: string
  skill_level: string
  status: boolean
}

export const useSkillStore = defineStore('skill', () => {
  const skill = ref<Skill | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchSkillByUserId = async (userId: number) => {
    try {
      loading.value = true
      const response = await api.get(`/skills/user/${userId}`)
      skill.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Failed to fetch skill data'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchUserByUsername = async (skillId: string) => {
    try {
      loading.value = true
      const response = await api.get(`/skill-sets/${skillId}`)
      skill.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Failed to fetch skill data'
      throw err
    } finally {
      loading.value = false
    }
  }

  

  const updateUser = async (skillId: number, skillData: Partial<Skill>) => {
    try {
      loading.value = true
      const response = await api.post(`skill-sets/${skillId}`, skillData)
      skill.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Failed to update skill data'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    skill,
    loading,
    error,
    fetchSkillByUserId,
    updateUser,
  }
})